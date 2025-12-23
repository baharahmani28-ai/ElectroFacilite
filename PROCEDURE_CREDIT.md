# 🔄 Procédure de Demande de Crédit - ElectroFacilite

## Vue d'ensemble du Système

Le système permet aux branches de soumettre des demandes de crédit clients qui sont automatiquement envoyées à l'administrateur pour approbation.

---

## 📋 Workflow Complet

### **Étape 1: Branche soumet une demande**

1. **Connexion à la succursale**
   - Le responsable de la succursale se connecte avec ses identifiants
   - Exemple: `setif@fcilite.com` / `setif123`

2. **Accès au formulaire client**
   - Cliquer sur **"Clients"** dans le menu
   - Cliquer sur le bouton **"Ajouter un client"**

3. **Remplir les informations du client**
   - Nom complet (obligatoire)
   - Email
   - Téléphone (obligatoire)
   - Adresse
   - N° Carte d'identité nationale
   - Date de naissance
   - Notes

4. **Soumission**
   - Cliquer sur **"Soumettre"**
   - Le statut du dossier devient automatiquement **"En attente"** (pending)
   - Une notification est automatiquement envoyée à l'administrateur

---

### **Étape 2: Notification à l'administrateur**

**Ce qui se passe automatiquement:**

1. ✅ Le dossier est enregistré dans la base de données avec:
   - `status` = "pending"
   - `branch_id` = ID de la succursale qui a soumis
   - `submitted_at` = Date et heure de soumission

2. 🔔 Une notification est créée et envoyée à **tous les administrateurs**:
   ```
   Titre: "Nouvelle demande de crédit"
   Message: "Sétif a soumis une demande de crédit pour [Nom du client]"
   ```

3. 📧 L'administrateur voit:
   - Une pastille rouge avec le nombre de notifications non lues
   - Les détails de la demande: Nom, succursale, date

---

### **Étape 3: Administrateur examine la demande**

1. **Connexion administrateur**
   - Email: `admin@fcilite.com`
   - Mot de passe: `admin123`

2. **Consulter les demandes en attente**
   - Aller sur **"Clients"**
   - Voir la liste des demandes avec statut **"En attente"**
   - Chaque demande affiche:
     - Nom du client
     - Succursale d'origine
     - Date de soumission
     - Informations complètes du client

3. **Prendre une décision**

   **Option A: Approuver** ✅
   - Cliquer sur le bouton **"Approuver"**
   - Le statut devient **"Approuvé"** (approved)
   - Une notification est envoyée à la succursale d'origine

   **Option B: Rejeter** ❌
   - Cliquer sur le bouton **"Rejeter"**
   - Entrer une raison du rejet
   - Le statut devient **"Rejeté"** (rejected)
   - Une notification avec la raison est envoyée à la succursale

---

### **Étape 4: Succursale reçoit la réponse**

1. 🔔 La succursale reçoit une notification:
   - **Si approuvé:** "La demande de crédit pour [Nom] a été approuvée"
   - **Si rejeté:** "La demande de crédit pour [Nom] a été rejetée"

2. 👀 La succursale peut voir le statut mis à jour dans la liste des clients

3. 📄 Pour les rejets, la raison est ajoutée dans les notes du dossier

---

## 🎯 Avantages du Système

### Pour les Succursales:
- ✅ Soumission rapide et simple
- ✅ Suivi en temps réel du statut
- ✅ Notifications instantanées des décisions
- ✅ Historique complet des demandes

### Pour l'Administrateur:
- ✅ Vue centralisée de toutes les demandes
- ✅ Notifications pour chaque nouvelle demande
- ✅ Peut approuver/rejeter en un clic
- ✅ Traçabilité complète (qui, quand, quelle succursale)

---

## 📊 États des Demandes

| Statut | Signification | Qui peut voir |
|--------|---------------|---------------|
| **Pending** (En attente) | Demande soumise, attend approbation | Succursale + Admin |
| **Approved** (Approuvé) | Crédit approuvé par l'admin | Succursale + Admin |
| **Rejected** (Rejeté) | Crédit refusé par l'admin | Succursale + Admin |

---

## 🔐 Contrôle d'Accès

### Succursales (role = 'pos'):
- ✅ Peuvent soumettre des demandes
- ✅ Voient leurs propres clients uniquement
- ✅ Reçoivent des notifications sur leurs demandes
- ❌ Ne peuvent pas approuver/rejeter

### Administrateur (role = 'admin'):
- ✅ Voit TOUS les clients de TOUTES les succursales
- ✅ Reçoit des notifications pour chaque nouvelle demande
- ✅ Peut approuver ou rejeter les demandes
- ✅ Peut voir l'historique complet

---

## 🌐 Points d'API Disponibles

### Pour les succursales:
```
POST   /api/customers          → Soumettre une demande
GET    /api/customers          → Voir leurs clients
GET    /api/notifications      → Voir leurs notifications
```

### Pour l'administrateur:
```
GET    /api/customers/pending  → Voir demandes en attente
PATCH  /api/customers/:id/approve  → Approuver une demande
PATCH  /api/customers/:id/reject   → Rejeter une demande
GET    /api/notifications      → Voir toutes les notifications
```

---

## 📱 Notifications en Temps Réel

Le système utilise une table `notifications` qui stocke:
- Type de notification
- Titre et message
- ID du destinataire
- Statut lu/non lu
- Date de création

**Chaque action crée une notification:**
1. Succursale soumet → Notification à l'admin
2. Admin approuve → Notification à la succursale
3. Admin rejette → Notification à la succursale (avec raison)

---

## 🎓 Exemple Concret

**Scénario: Client à Sétif veut acheter un réfrigérateur à crédit**

1. **Mohammed (Responsable Sétif)** se connecte
2. Il va dans **Clients** → **Ajouter un client**
3. Il remplit:
   - Nom: Ahmed Benali
   - Téléphone: 0555123456
   - Adresse: Rue de la Liberté, Sétif
   - CIN: 987654321
4. Il clique **Soumettre**

5. **Système automatiquement:**
   - Enregistre le client avec `branch_id` = Sétif
   - Met le statut = "pending"
   - Envoie notification à l'admin

6. **Vous (Administrateur)** recevez notification:
   - "Sétif a soumis une demande de crédit pour Ahmed Benali"

7. Vous consultez le dossier et décidez:
   - ✅ Approuver → Mohammed reçoit notification
   - ❌ Rejeter → Mohammed reçoit notification avec raison

8. **Mohammed** voit la décision et peut procéder selon le résultat

---

## ✅ Système Prêt!

Toutes les 6 succursales peuvent maintenant:
- Se connecter avec leurs identifiants
- Soumettre des demandes de crédit
- Recevoir des notifications
- Voir le statut en temps réel

Vous (administrateur) pouvez:
- Voir toutes les demandes en temps réel
- Approuver/Rejeter en un clic
- Recevoir des alertes pour chaque nouvelle demande

**Le système est entièrement fonctionnel et prêt à l'emploi!** 🚀
