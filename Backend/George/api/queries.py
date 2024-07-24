from .models import Item
from database.db import session
def listItems_resolver(obj, info):
    try:
        # print(session.query(Item).all())
        # items = [item.to_dict() for item in Item.query.all()]
        # items = session.query(Item).all()
        all_items = session.query(Item).all()
        allitems = [item.to_dict() for item in all_items]
        print(allitems)
        payload = {
            "success": True,
            "items": allitems
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload