# EV Warranty Management System

**Role:** Backend Developer  
**Timeline:** 19/12/2025 - 07/02/2026  
**Status:** Completed  
**Team Size:** Group Project

## 🌟 Overview

The EV Warranty System is a specialized, centralized warranty management platform tailored for the Electric Vehicle (EV) ecosystem. It acts as a data bridge between Original Equipment Manufacturers (OEM) and Service Centers. The system standardizes the workflow of receiving, processing, and analyzing warranty claims, alongside monitoring operating data for electric vehicles.

## 🚀 Key Features

- **Service Center Portal:** Manage vehicle data, repair history, and create online warranty claims effortlessly.
- **Manufacturer Dashboard:** Real-time monitoring of warranty activities, component management, claim approval workflows, and recall campaign operations.
- **AI-Driven Risk Analysis:** Predictive analytics mapping out potential component failures based on current operational data and vehicle model history.
- **System Administration:** Granular Role-Based Access Control (RBAC) ensuring tight security and functional isolation among Admins, Service Staff, Technicians, and OEM Staff.

## 🛠️ Technical Stack

- **Backend:** Java 21, Spring Boot 3.2
- **Frontend / View:** Thymeleaf, Bootstrap, jQuery, CSS3
- **Database:** PostgreSQL 17
- **DevOps & Tooling:** Docker, Docker Compose, Apache Maven

## 💡 Technical Highlights

- Architected a secure, data-intensive backend adopting standard RESTful practices and layered system structure.
- Successfully dockerized the entire application, creating a seamless `docker-compose` environment that launches both the App and PostgreSQL database with a single CLI command, vastly improving the DX (Developer Experience).
- Implemented sophisticated JPA/Hibernate relationships to handle complex entities (Vehicles, Claims, Components, Users, Centers) while maintaining data integrity.
