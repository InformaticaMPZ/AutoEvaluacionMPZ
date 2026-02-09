# -*- coding: utf-8 -*-
# from odoo import http


# class FollowUp(http.Controller):
#     @http.route('/follow_up/follow_up', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/follow_up/follow_up/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('follow_up.listing', {
#             'root': '/follow_up/follow_up',
#             'objects': http.request.env['follow_up.follow_up'].search([]),
#         })

#     @http.route('/follow_up/follow_up/objects/<model("follow_up.follow_up"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('follow_up.object', {
#             'object': obj
#         })

