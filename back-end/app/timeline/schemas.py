from marshmallow import Schema, fields


class FrequencySchema(Schema):
    year_from = fields.Int(required=True)
    year_to = fields.Int(required=True)
    word = fields.Str(required=True)
