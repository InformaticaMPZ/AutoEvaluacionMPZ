# -*- coding: utf-8 -*-
{
    'name': "SEVRI",

    'summary': "SEVRI",

    'description': """
        SEVRI
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    "category": "Administration",
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'hr', 'shared','web'],

    # always loaded
    'data': [
        #'security/ir.model.access.csv',
        'views/views.xml',
        'views/sevri_process/actions.xml',
        'views/sevri_process/view_form.xml',
        'views/sevri_process/view_tree.xml',
        'views/activities.xml',
        'views/events.xml',
        'views/event_type.xml',
        'views/classifications.xml',
        'views/specifications.xml',
        
        'views/units.xml',


        
        'data/event_types.xml',
        'data/classifications.xml',
        'data/specifications.xml',
        'security/groups/admin.xml',
        'security/groups/audit.xml',
        'security/groups/internal_control.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    
    'installable': True,
    'auto_install': False,
    'application': False,
}

