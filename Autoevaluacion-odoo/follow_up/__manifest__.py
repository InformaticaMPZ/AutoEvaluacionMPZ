# -*- coding: utf-8 -*-
{
    'name': "follow_up",

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
Long description of module's purpose
    """,

    'author': "Daniel Araya",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Administration',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'cii_autoevaluation', 'mature_model', 'sevri'],

    # always loaded
    'data': [
        # 'security/autoevaluation_follow_up/admin.xml',
        # 'security/autoevaluation_follow_up/auditor.xml',
        # 'security/autoevaluation_follow_up/internal_control.xml',

        # 'security/mature_model_follow_up/admin.xml',
        # 'security/mature_model_follow_up/auditor.xml',
        # 'security/mature_model_follow_up/internal_control.xml',

        # 'security/sevri_follow_up/admin.xml',
        # 'security/sevri_follow_up/auditor.xml',
        # 'security/sevri_follow_up/internal_control.xml',

        'views/autoevaluation_follow_up/actions.xml',
        'views/autoevaluation_follow_up/view_form.xml',
        'views/autoevaluation_follow_up/view_graph.xml',
        'views/autoevaluation_follow_up/view_kanban.xml',
        'views/autoevaluation_follow_up/view_tree.xml',

        'views/mature_model_follow_up/actions.xml',
        'views/mature_model_follow_up/view_form.xml',
        'views/mature_model_follow_up/view_graph.xml',
        'views/mature_model_follow_up/view_kanban.xml',
        'views/mature_model_follow_up/view_tree.xml',

        'views/sevri_follow_up/actions.xml',
        'views/sevri_follow_up/view_form.xml',
        'views/sevri_follow_up/view_graph.xml',
        'views/sevri_follow_up/view_kanban.xml',
        'views/sevri_follow_up/view_tree.xml',
        'views/sevri_follow_up/view_pivot.xml',
        'views/sevri_follow_up/search_filter.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}

