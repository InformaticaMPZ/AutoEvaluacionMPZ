# -*- coding: utf-8 -*-

from odoo import models, fields, api


class User(models.Model):
    _inherit = 'res.users'


class Unit(models.Model):
    _inherit = 'sci.unit'


class Department(models.Model):
    _inherit = 'hr.department'

    unit_id = fields.Many2one('sci.unit', string='Unidad')
    activities = fields.One2many(
        'sev.activity', 'department_id', string='Actividades'
    )


class Activity(models.Model):
    _name = 'sev.activity'
    _description = 'Actividad'
    _rec_name = 'title'
    
    title = fields.Char(string='Título')
    subtitle = fields.Char(string='Subtítulo')
    activity_date = fields.Date(string='Fecha de Actividad')
    dependency = fields.Char(string='Dependencia')
    procedure_to_follow = fields.Char(string='Procedimiento a Seguir')

    department_id = fields.Many2one('hr.department', string='Departamento')
    events = fields.One2many('sev.event', 'activity_id', string='Eventos')


class Event(models.Model):
    _name = 'sev.event'
    _description = 'Evento'
    _rec_name = 'activity_id'

    activity_id = fields.Many2one('sev.activity', string='Actividad')

    description = fields.Text(string='Descripción')
    causes = fields.Text(string='Causas')
    consequences = fields.Text(string='Consecuencias')

    event_type_id = fields.Many2one('sev.event_type', string='Tipo de Evento')
    event_classification_id = fields.Many2one('sev.classification', string='Clasificación')
    event_specification_id = fields.Many2one('sev.specification', string='Especificación')

    probability = fields.Integer(
        string='Probabilidad', default=0, required=True)
    impact = fields.Integer(string='Impacto', default=0, required=True)
    risk_level = fields.Selection([
        ('low', 'Bajo'),
        ('medium', 'Medio'),
        ('high', 'Alto'),
    ], default='low', string='Nivel de Riesgo')

    existent_control_measures = fields.Text(string='Medidas de Control Existentes')

    actitude = fields.Selection([
        ('negative', 'Negativa'),
        ('positive', 'Positiva'),
    ], default='negative', string='Actitud')
    aptitude = fields.Selection([
        ('negative', 'Negativa'),
        ('positive', 'Positiva'),
    ], default='negative', string='Aptitud')
    new_risk_level = fields.Selection([
        ('low', 'Bajo'),
        ('medium', 'Medio'),
        ('high', 'Alto'),
    ], default='low', string='Nuevo Nivel de Riesgo')
    acceptance = fields.Selection([
        ('acceptable', 'Aceptable'),
        ('unacceptable', 'Inaceptable'),
    ], default='acceptable', string='Aceptación')

    creation_date = fields.Date(string='Fecha de Creación')
    last_update = fields.Date(string='Última Actualización')
    status = fields.Selection([
        ('active', 'Activo'),
        ('inactive', 'Inactivo'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completado'),
    ], default='inactive', string='Estado')

    proposed_actions = fields.One2many(
        'sev.proposed_action', 'event_id', string='Acciones Propuestas'
    )


class EventType(models.Model):
    _name = 'sev.event_type'
    _description = 'Tipo de Evento'

    name = fields.Char(string='Nombre')
    description = fields.Text(string='Descripción')
    events = fields.One2many('sev.event', 'event_type_id', string='Eventos')
    classifications = fields.One2many(
        'sev.classification', 'event_type_id', string='Clasificaciones')


class Classification(models.Model):
    _name = 'sev.classification'
    _description = 'Clasificación'
    _rec_name = 'description'

    description = fields.Text(string='Descripción')
    events = fields.One2many('sev.event', 'event_classification_id', string='Eventos')
    event_type_id = fields.Many2one('sev.event_type', string='Tipo de Evento')
    specifications = fields.One2many(
        'sev.specification', 'classification_id', string='Especificaciones')


class Specification(models.Model):
    _name = 'sev.specification'
    _description = 'Especificación'
    _rec_name = 'description'

    events = fields.One2many('sev.event', 'event_specification_id', string='Eventos')
    description = fields.Text(string='Descripción')
    classification_id = fields.Many2one(
        'sev.classification', string='Clasificación')


class ProposedAction(models.Model):
    _name = 'sev.proposed_action'
    _description = 'Acción Propuesta'

    event_id = fields.Many2one('sev.event', string='Evento')
    description = fields.Text(string='Descripción')
    indicators = fields.Text(string='Indicadores')
    responsible = fields.Many2one('res.users', string='Responsable')

    accomplishment_level = fields.Selection([
        ('yes', 'Sí'),
        ('no', 'No'),
        ('partial', 'Parcial'),
    ], default='no', string='Nivel de Cumplimiento')

    justification = fields.Text(string='Justificación')
    action_date = fields.Date(string='Fecha de Acción')
