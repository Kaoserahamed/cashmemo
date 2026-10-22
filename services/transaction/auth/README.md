# cashmemo Authentication Module

## Overview
Authentication system for personal/family/business accounts with OAuth2, JWT, and MFA.

## Files
- `services/transaction/auth.py` - Authentication logic
- `services/transaction/models.py` - User and account models
- `services/transaction/middleware.py` - Auth middleware and RBAC
- `services/transaction/routes/auth.py` - Auth API routes
- `services/transaction/mfa.py` - Multi-factor authentication

## Features
- Personal, family, and business account registration/login
- JWT-based session management
- OAuth2 provider integration
- Role-Based Access Control (RBAC)
- Multi-factor authentication (MFA)
- Password hashing with bcrypt
- Session timeout handling

## Tech Stack
- Node.js/Express
- PostgreSQL
- JWT
- OAuth2
- bcrypt for password hashing

## Day 5 Outcome
Authentication module implemented. 1 PR created targeting development.