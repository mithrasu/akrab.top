---
author: Mithras
pubDatetime: 2024-05-28T10:17:05.000+08:00
modDatetime: 
title: 软件设计原则
featured: false
draft: false
tags:
  - Software Design
  - OOP
description: 本文简要介绍一些基本的、基于面向对象编程（OOP）的设计原则，帮助开发人员创建健壮、可维护和可拓展的软件系统
---


> [Software Design Principles Guide](https://chatgpt.com/share/8b293ba8-d1f8-497a-8d24-fc2a5dac7487)

软件设计是软件开发过程的重要步骤，软件设计原则旨在帮助软件开发人员创建健壮、可维护和可拓展的软件系统。

![Development Process](https://image.akrab.top/blog-picture/2024/05/ee71542e866f8d5f3b689b7d7325637f.png)

基本上，软件设计原则是基于 OOP 的面向对象的设计原则。

## **SOLID**

SOLID 中每个字母表示一个原则：

| 字母 |              英文               |     中文     |
| :--: | :-----------------------------: | :----------: |
|  S   | Single Responsibility Principle | 单一职责原则 |
|  O   |      Open/Closed Principle      |   开闭原则   |
|  L   |  Liskov Substitution Principle  | 里氏替换原则 |
|  I   | Interface Segregation Principle | 接口隔离原则 |
|  D   | Dependency Inversion Principle  | 依赖反转原则 |

### SRP

一个类应该有且仅有一个引起它变化的原因。换句话说，一个类应该仅有一个单一的、明确定义的职责。

### OCP

一个类应该对扩展开放，对修改关闭。这意味着你应该能够通过添加新代码来扩展类的功能，而不必修改现有代码。

### LSP

子类的对象应该能够替换基类的对象，而不会影响程序的正确性。这意味着子类应该与基类具有相同的接口，并且应该能够在任何使用基类的地方使用子类。

### ISP

不应该强迫客户端依赖它们不使用的方法。这意味着接口应该被细化为更小的、更具体的接口，每个接口只包含客户端实际需要的方法。

### DIP

高层模块不应该依赖底层模块。相反，它们应该依赖于抽象。这意味着高层模块应该通过接口或抽象类来与底层模块进行交互，而不是直接依赖底层模块的具体实现。

## DRY

DRY（Don’t Repeat Yourself），通过将通用功能抽象为可重用的模块来避免重复代码，减少代码冗余和不一致的问题。

## KISS

KISS（Keep It Simple, Stupid），保持设计简单明了，避免不必要的复杂性。

## YAGNI

YAGNI（You Aren't Gonna Need It），除非有必要，否则不要添加功能。

## SOC

SOC（Separation Of Concerns），将一个程序分解为彼此功能重叠尽可能小的独特特性，使系统更加模块化。

## Encap

Encap（Encapsulation），封装组件工作方式的详细信息，仅公开必要的内容。

## CoI

CoI（Composition over Inheritance），在设计系统时，尽量使用组合而不是继承。

## LoD

LoD（迪米特法则，Law of Demeter），只与你的直接朋友交谈，不跟“陌生人”说话（Talk only to your immediate friends and not to strangers）低耦合，高内聚。

设计系统时，应尽量减少对象之间的交互，强调低耦合，高内聚。

## POLA

POLA（Principle Of Least Astonishment），设计应该做用户期望它做的事情，减少惊喜，使系统更易于使用。

## 12FA

12FA（Twelve-Factor App），对于云原生应用程序，该方法提供了 Sass（软件即服务）应用程序的最佳实践。

### Codebase

每个应用对应一个代码库，可以通过 Git 等版本控制工具管理，从一个代码库部署多个环境。

### Dependencies

显式声明和隔离依赖。应用的依赖应在配置文件中明确声明，并使用依赖管理工具进行安装。

### Config

将配置与代码分离，通过环境变量管理配置。

### Backing Service

将后端服务（数据库、缓存等）视为附加资源，通过配置进行连接。

### Build, Release, Run

严格分离构建和运行的步骤。构建阶段生成可执行包，发布阶段将配置与可执行包结合，运行阶段启动应用。

### Processes

应用应该作为一个或多个无状态进程运行，进程之间不共享任何数据，所有数据存储在后端服务中。

### Port Binding

应用是独立的，通过端口绑定来暴露服务。

### Concurrency

应用设计为可以水平拓展，通过增加进程数量来处理更多的工作负载。

### Disposability

通过快速启动和正常关闭最大限度地提高稳健性，以便快速拓展和部署。

### Dev/Prod Parity

保持开发、测试和生产环境尽可能相似，以减少部署时的意外问题。

### Logs

将日志视为事件流，不由应用管理或存储，而是将日志发送到一个集中式系统进行存储、分析和长期存档。

### Admin Processes

管理任务（如数据库迁移、数据清理）在与应用相同的环境中作为一次性进程运行。
