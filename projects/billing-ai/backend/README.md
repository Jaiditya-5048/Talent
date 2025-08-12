
Backend notes:
- RBAC implemented via Roles decorator + RolesGuard under shared/.
- JwtAuthGuard reads auth_token cookie and decodes payload to req.user.
- TasksController update enforces dev-field restrictions server-side.
- Run seed: npm run seed
