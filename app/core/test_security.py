from app.core.security import hash_password, verify_password

hashed = hash_password("rahul123")

print(verify_password("rahul123", hashed))
print(verify_password("harini123", hashed))