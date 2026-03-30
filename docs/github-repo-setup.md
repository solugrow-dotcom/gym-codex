# SoluGrow Project को GitHub Repo बनाने के Steps

## 1) Local repo already ready है
यह project git initialized है और commits मौजूद हैं।

## 2) GitHub पर नया empty repository बनाएं
GitHub पर जाकर new repository बनाएं (without README, without .gitignore).

Example repository name:
- `solugrow-gym-saas`

## 3) Remote add करें
`<YOUR_GITHUB_USERNAME>` और `<YOUR_REPO_NAME>` replace करें:

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
```

अगर remote पहले से है:

```bash
git remote set-url origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
```

## 4) Current branch push करें

```bash
git push -u origin work
```

अगर main branch चाहिए:

```bash
git branch -M main
git push -u origin main
```

## 5) Verify

```bash
git remote -v
git branch --show-current
git log --oneline -n 5
```

## Optional: PAT (Personal Access Token)
अगर password prompt आए तो GitHub PAT use करें (password की जगह token).

## Quick copy-paste flow

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git || \
  git remote set-url origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

git push -u origin work
```
