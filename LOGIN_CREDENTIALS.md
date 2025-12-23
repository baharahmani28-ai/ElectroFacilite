# Quick Login Reference Card

## 🔐 All User Accounts

### Admin Account (Full Access)
```
Email:    admin@fcilite.com
Password: admin123
Role:     admin
Access:   All branches, full system access
```

### Branch POS Accounts (Branch-Specific Access)

#### Batna Branch
```
Email:    batna@fcilite.com
Password: branch123
Role:     pos
Branch:   Batna (BR-001)
```

#### Constantine Branch
```
Email:    constantine@fcilite.com
Password: branch123
Role:     pos
Branch:   Constantine (BR-002)
```

#### Sétif Branch
```
Email:    setif@fcilite.com
Password: branch123
Role:     pos
Branch:   Sétif (BR-003)
```

#### Bou Saada Branch
```
Email:    bousaada@fcilite.com
Password: branch123
Role:     pos
Branch:   Bou Saada (BR-004)
```

#### Breika Branch
```
Email:    breika@fcilite.com
Password: branch123
Role:     pos
Branch:   Breika/Barika (BR-005)
```

#### M'Sila Branch
```
Email:    msila@fcilite.com
Password: branch123
Role:     pos
Branch:   M'Sila (BR-006)
```

---

## 🧪 Test Login (Quick)

```bash
# From backend directory
npx ts-node src/testBranchLogin.ts
```

---

## ⚠️ Important Notes

1. **Email is case-insensitive**: `batna@fcilite.com` = `BATNA@fcilite.com`
2. **Spaces are trimmed**: `  batna@fcilite.com  ` works fine
3. **All POS users** use password: `branch123`
4. **Admin user** uses password: `admin123`
5. **Branch users** can only see their own branch data
6. **Admin** can see all branches

---

## 🔧 If Login Fails

1. Run test script: `npx ts-node src/testBranchLogin.ts`
2. Check server logs for detailed error messages
3. Verify account is active: `SELECT is_active FROM users WHERE email = 'batna@fcilite.com'`
4. See full documentation: `AUTHENTICATION_FIX.md`
