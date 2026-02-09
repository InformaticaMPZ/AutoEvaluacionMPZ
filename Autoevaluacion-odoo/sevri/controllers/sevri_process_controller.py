import json
import logging
from odoo.http import Controller, Response, request, route
from ..services.sevri_process_service import SevriProcessService
from ...shared.utils.response import create_json_response
from datetime import datetime


_logger = logging.getLogger(__name__)


class SevriProcessController(Controller):

    @route(
        "/api/v1/sevri/sevri-processes/actual",
        type="http",
        auth="public",
        methods=["GET"],
        csrf=False,
    )
    def get_actual_sevri_processes(self, **kwargs):
        try:
            current_date = datetime.now().date()
            evaluation_processes = (
                request.env["sev.process"]
                .sudo()
                .search(
                    [
                        ("initial_date", "<=", current_date),
                        ("final_date", ">=", current_date),
                    ]
                )
            )
            if evaluation_processes:
                evaluation_process = SevriProcessService.compare_dates(
                    evaluation_processes, current_date
                )
                if evaluation_process:
                    return Response(
                        create_json_response(data=evaluation_process, status=200),
                        content_type="application/json;charset=utf-8",
                        status=200,
                    )
            return Response(
                create_json_response(
                    data=[], status=404, message="No active sevri process"
                ),
                content_type="application/json;charset=utf-8",
                status=404,
            )
        except Exception as e:
            _logger.error(f"Error getting actual sevri processes: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )

    @route(
        "/api/v1/sevri/sevri-processes/<string:department_id>",
        type="http",
        auth="public",
        methods=["GET"],
        csrf=False,
    )
    def get_sevri_processes(self, department_id):
        try:
            activities = request.env["sev.activity"].sudo().search([("department_id.id", "=", department_id)])
            logging.info(f"Activities: {activities}")
            if not activities:
                return Response(
                    create_json_response(data=[], status=200, message="No activities found"),
                    content_type="application/json;charset=utf-8",
                    status=404,
                )
            sevri_process_ids = activities.mapped("sevri_process_id.id")
            sevri_processes = request.env["sev.process"].sudo().search([("id", "in", sevri_process_ids), ("status", "!=", "active")])
            sevri_process_parsed = SevriProcessService.parse_sevri_processes(sevri_processes)
            return Response(
                create_json_response(data=sevri_process_parsed, status=200),
                content_type="application/json;charset=utf-8",
                status=200,
            )
        except Exception as e:
            _logger.error(f"Error getting sevri processes: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )

    @route(
        "/api/v1/sevri/sevri-processes",
        type="http",
        auth="public",
        methods=["POST"],
        csrf=False,
    )
    def post_sevri_process(self, **kwargs):
        try:
            sevri_process = SevriProcessService.post_sevri_process(**kwargs)
            return Response(
                create_json_response(
                    data=sevri_process, status=201, message="Sevri process created"
                ),
                content_type="application/json;charset=utf-8",
                status=201,
            )
        except Exception as e:
            _logger.error(f"Error creating sevri process: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )

    @route(
        "/api/v1/sevri/sevri-processes/<int:sevri_process_id>",
        type="http",
        auth="public",
        methods=["PUT"],
        csrf=False,
    )
    def update_sevri_process(self, sevri_process_id, **kwargs):
        try:
            data = json.loads(request.httprequest.data)

            sevri_process = SevriProcessService.update_sevri_process(
                sevri_process_id, data
            )
            return Response(
                create_json_response(data=sevri_process, status=200),
                content_type="application/json;charset=utf-8",
                status=200,
            )
        except Exception as e:
            _logger.error(f"Error updating sevri process: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )

    @route(
        "/api/v1/sevri/sevri-processes/<int:sevri_process_id>",
        type="http",
        auth="public",
        methods=["DELETE"],
        csrf=False,
    )
    def delete_sevri_process(self, sevri_process_id):
        try:
            sevri_process = SevriProcessService.delete_sevri_process(
                sevri_process_id
            )
            return Response(
                create_json_response(data=sevri_process, status=200),
                content_type="application/json;charset=utf-8",
                status=200,
            )
        except Exception as e:
            _logger.error(f"Error deleting sevri process: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )
    @route(
        "/api/v1/sevri/sevri-processes/byId/<int:sevri_process_id>",
        type="http",
        auth="public",
        methods=["GET"],
        csrf=False,
    )
    def get_sevri_process_by_id(self, sevri_process_id):
        try:
            sevri_process = request.env["sev.process"].sudo().search([("id", "=", sevri_process_id)], limit=1)
            if sevri_process:
                sevri_process_res = SevriProcessService._parse_single_sevri_process(sevri_process)
                return Response(
                    create_json_response(data=sevri_process_res, status=200),
                    content_type="application/json;charset=utf-8",
                    status=200,
                )
            return Response(
                create_json_response(
                    data=[], status=404, message="No sevri process found"
                ),
                content_type="application/json;charset=utf-8",
                status=404,
            )
        except Exception as e:
            _logger.error(f"Error getting sevri process by id: {str(e)}")
            return Response(
                create_json_response(data=[], status=404, message=str(e)),
                content_type="application/json;charset=utf-8",
                status=404,
            )