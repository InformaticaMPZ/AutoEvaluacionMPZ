from odoo import models, fields


class Event(models.Model):
    _name = "sev.event"
    _description = "Evento"
    _rec_name = "id"

    activity_id = fields.Many2one("sev.activity", string="Actividad")

    description = fields.Text(string="Descripción")
    causes = fields.Text(string="Causas")
    consequences = fields.Text(string="Consecuencias")

    event_type_id = fields.Many2one("sev.event_type", string="Tipo de Evento")
    event_classification_id = fields.Many2one(
        "sev.classification", string="Clasificación"
    )
    event_specification_id = fields.Many2one(
        "sev.specification", string="Especificación"
    )

    probability = fields.Integer(string="Probabilidad", default=0, required=True)
    impact = fields.Integer(string="Impacto", default=0, required=True)
    risk_level = fields.Selection(
        [
            ("low", "Bajo"),
            ("medium", "Medio"),
            ("high", "Alto"),
        ],
        default="low",
        string="Nivel de Riesgo",
    )

    existent_control_measures = fields.Text(string="Medidas de Control Existentes")

    actitude = fields.Selection(
        [
            ("negative", "Negativa"),
            ("positive", "Positiva"),
        ],
        default="negative",
        string="Actitud",
    )
    aptitude = fields.Selection(
        [
            ("negative", "Negativa"),
            ("positive", "Positiva"),
        ],
        default="negative",
        string="Aptitud",
    )
    new_risk_level = fields.Selection(
        [
            ("low", "Bajo"),
            ("medium", "Medio"),
            ("high", "Alto"),
        ],
        default="low",
        string="Nuevo Nivel de Riesgo",
    )
    acceptance = fields.Selection(
        [
            ("acceptable", "Aceptable"),
            ("unacceptable", "Inaceptable"),
        ],
        default="acceptable",
        string="Aceptación",
    )

    creation_date = fields.Date(string="Fecha de Creación")
    last_update = fields.Date(string="Última Actualización")
    status = fields.Selection(
        [
            ("active", "Activo"),
            ("inactive", "Inactivo"),
            ("in_progress", "En Progreso"),
            ("completed", "Completado"),
        ],
        default="inactive",
        string="Estado",
    )

    proposed_actions = fields.One2many(
        "sev.proposed_action", "event_id", string="Acciones Propuestas"
    )
