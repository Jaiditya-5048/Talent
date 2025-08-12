
Frontend notes:
- Dashboard supports inline cell editing. Field editability is controlled by user's role fetched from /auth/me.
- Current demo sets user.role='dev' if /auth/me is not available; in production the guard returns payload and frontend will read it.
