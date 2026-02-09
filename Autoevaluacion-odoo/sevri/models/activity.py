from odoo import models, fields, api


class Activity(models.Model):
    _name = "sev.activity"
    _description = "Actividad"
    _rec_name = "title"

    title = fields.Char(string="Título")
    subtitle = fields.Char(string="Subtítulo")
    activity_date = fields.Date(string="Fecha de Actividad")
    dependency = fields.Char(string="Dependencia")
    procedure_to_follow = fields.Char(string="Procedimiento a Seguir")
    sevri_process_id = fields.Many2one("sev.process", string="Proceso")
    department_id = fields.Many2one("hr.department", string="Departamento")
    events = fields.One2many("sev.event", "activity_id", string="Eventos")
