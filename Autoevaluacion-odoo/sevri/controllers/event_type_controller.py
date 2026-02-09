# -*- coding: utf-8 -*-
import json
import logging
from odoo.http import Controller, Response, request, route
from ..services.event_type_service import EventTypeService

_logger = logging.getLogger(__name__)

class EventTypeController(Controller):
      
    @route(
        "/api/v1/sevri/eventTypes",
        type="http",
        auth="public",
        methods=["GET"],
        csrf=False,
        )
    def get_event_types(self, **kwargs):
        event_types = EventTypeService.get_event_types()
        if event_types:
            return Response(
                json.dumps(event_types),
                content_type="application/json;charset=utf-8",
                status=200,
            )
        else:
            return request.not_found()
        