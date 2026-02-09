# -*- coding: utf-8 -*-
import json
import jwt
import requests
from odoo import http
from odoo.http import request, Response

AZURE_TENANT_ID = "280fc1b5-f5ac-4a4d-9a3a-090ad5e78149"
AZURE_CLIENT_ID = "3e7ff60f-2d1c-4ddc-b06a-b9a9731cce02"
AZURE_OPENID_CONFIG = f"https://login.microsoftonline.com/{AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration"


class AzureAuthController(http.Controller):

    @http.route(
        "/api/v1/auth/azure",
        type="http",
        auth="public",
        methods=["POST"],
        csrf=False
    )
    def auth_azure(self, **kwargs):
        try:
            data = json.loads(request.httprequest.data or "{}")
            token = data.get("params", {}).get("token")

            if not token:
                return self._error("Token no enviado")

            # ===============================
            # 1️⃣ OBTENER KEYS DE AZURE
            # ===============================
            oidc = requests.get(AZURE_OPENID_CONFIG).json()
            jwks_uri = oidc["jwks_uri"]
            jwks = requests.get(jwks_uri).json()

            # ===============================
            # 2️⃣ VALIDAR ID TOKEN
            # ===============================
            unverified_header = jwt.get_unverified_header(token)
            key = next(
                k for k in jwks["keys"]
                if k["kid"] == unverified_header["kid"]
            )

            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))

            payload = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                audience=AZURE_CLIENT_ID,
                options={"verify_exp": True}
            )

            email = payload.get("email") or payload.get("preferred_username")

            if not email:
                return self._error("Email no encontrado en token")

            # ===============================
            # 3️⃣ BUSCAR USUARIO EN ODOO
            # ===============================
            user = request.env["res.users"].sudo().search(
                [("login", "=", email)],
                limit=1
            )

            if not user:
                return self._error("Usuario no existe en Odoo")

            employee = user.employee_id
            department = employee.department_id if employee else False

            if not department:
                return self._error("Usuario sin departamento")

            # ===============================
            # 4️⃣ ROLES (GROUPS)
            # ===============================
            roles = [g.name for g in user.groups_id]

            # ===============================
            # 5️⃣ RESPUESTA FINAL
            # ===============================
            return Response(
                json.dumps({
                    "jsonrpc": "2.0",
                    "id": None,
                    "result": {
                        "email": email,
                        "user_id": user.id,
                        "department": department.id,
                        "department_name": department.name,
                        "roles": roles,
                    }
                }),
                content_type="application/json",
                status=200
            )

        except Exception as e:
            return self._error(str(e))

    def _error(self, message):
        return Response(
            json.dumps({
                "jsonrpc": "2.0",
                "id": None,
                "error": message
            }),
            content_type="application/json",
            status=200
        )
