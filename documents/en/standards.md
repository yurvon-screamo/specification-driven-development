# 📋 Standards and Methodological References

This section systematically organizes key industry standards, methodologies, and best practices that form the foundation for a Software Design Document (SDD). Applying these approaches ensures:

- Clarity and unambiguity of requirements  
- High quality of architecture and documentation  
- Minimization of risks and ambiguities in development  
- Compliance with international quality standards  

---

## EARS (Easy Approach to Requirements Syntax)

A structured approach to formulating requirements that ensures clarity, verifiability, and unambiguity through standardized templates.

### Key EARS Templates

#### 1. WHEN (Event-Driven Requirements)

**Purpose:** Describing the system’s response to specific events or triggers  
**Format:** `WHEN [event/trigger] THEN [system] SHALL [action]`  

**Examples:**

- WHEN the user clicks the "Save" button THEN the system SHALL validate all form fields  
- WHEN a file upload exceeds 10 MB THEN the system SHALL display an error message  
- WHEN the user’s session expires THEN the system SHALL redirect to the login page  

#### 2. IF (State-Driven Requirements)

**Purpose:** Describing system behavior under specific conditions  
**Format:** `IF [condition] THEN [system] SHALL [action]`  

**Examples:**

- IF the user is not authenticated THEN the system SHALL deny access to protected resources  
- IF the database connection fails THEN the system SHALL display a maintenance message  
- IF the user has administrator privileges THEN the system SHALL display the admin panel  

#### 3. WHILE (Continuous Requirements)

**Purpose:** Describing persistent system behavior while in a specified state  
**Format:** `WHEN [state] THEN [system] SHALL [continuous behavior]`  

**Examples:**

- WHEN a file is uploading THEN the system SHALL display a progress indicator  
- WHEN the user is typing THEN the system SHALL provide real-time validation feedback  
- WHEN the system is processing a request THEN the system SHALL prevent duplicate submissions  

#### 4. WHERE (Context-Dependent Requirements)

**Purpose:** Constraining a requirement to a specific context or environment  
**Format:** `WHERE [context] THEN [system] SHALL [behavior]`  

**Examples:**

- WHERE the user is on a mobile device THEN the system SHALL use a responsive layout  
- WHERE the application runs in production mode THEN the system SHALL log errors to an external service  
- WHERE multiple users edit simultaneously THEN the system SHALL handle conflicts gracefully  

### EARS Application Guidelines

| Category         | Recommendations                                                                 | Examples                                                                 |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Syntax**       | • Use active voice • Consistently use the term "system" instead of synonyms      | ❌ "Fields must be validated" ✅ "The system SHALL validate fields"   |
| **Specificity**  | • Avoid vague terms • Specify quantitative parameters                           | ❌ "Fast response" ✅ "Response time under 300 ms"                    |
| **Structure**    | • One requirement = one statement • Clear verification criteria                  | ❌ "The system SHALL validate and save" ✅ Two separate requirements |

### EARS Anti-Patterns

🚫 **Compound Requirements**  
*Example:* "WHEN the user enters data THEN the system SHALL validate and save"  
*Solution:* Split into two distinct requirements with separate triggers  

🚫 **Ambiguous Conditions**  
*Example:* "WHEN data is entered THEN the system SHALL process"  
*Solution:* Specify exact conditions ("WHEN all mandatory fields are filled")  

🚫 **Implementation Details**  
*Example:* "WHEN the form is submitted THEN the system SHALL use a REST API"  
*Solution:* Focus on the outcome ("...the system SHALL save the data")  

---

## Industry Standards

### IEEE 830-1998: IEEE Recommended Practice for Software Requirements Specifications

**Standard Purpose:** Providing a structured approach to documenting requirements through an SRS (Software Requirements Specification).

#### Key Characteristics of a High-Quality SRS

- **Completeness:** All functional and non-functional requirements are accounted for  
- **Unambiguity:** No ambiguous or vague phrasing  
- **Verifiability:** Each requirement includes verification criteria  
- **Consistency:** No contradictions between requirements  
- **Traceability:** Clear linkage to sources and lifecycle phases  

#### Recommended SRS Structure

```markdown
1. Introduction
   - Purpose of the document
   - Scope
   - Definitions, acronyms, and abbreviations
   - References to related documents

2. Overall Description
   - System context
   - User characteristics
   - Implementation constraints
   - Assumptions and dependencies

3. Specific Requirements
   - Functional requirements (FR-001, FR-002...)
   - Non-functional requirements (NFR-001...)
   - Interfaces
   - Data requirements

4. Appendices
   - Traceability matrix
   - Diagrams
   - Sample scenarios
```

#### Requirements Specification Format

Each requirement must include:

- Unique identifier (e.g., FR-001)  
- Short title  
- Detailed description  
- Source (customer/document)  
- Priority (Must/Should/Could)  
- Acceptance criteria  
- Dependencies  

---

## Architectural Principles and Methodologies

### SOLID Principles

| Principle                   | Description                                                      | Anti-Pattern                                              |
| ------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| **Single Responsibility** | Each component should serve only one actor/user role             | God Object                                                |
| **Open/Closed**           | Open for extension, closed for modification                      | Frequent changes to base code                             |
| **Liskov Substitution**   | Subclasses must be substitutable for their base classes          | Violation of inheritance contracts                        |
| **Interface Segregation** | Prefer specific interfaces over general-purpose ones             | "Fat" interfaces                                           |
| **Dependency Inversion**  | Depend on abstractions, not concrete implementations             | Tight coupling to concrete implementations of higher layers |

### Domain-Driven Design (DDD)

**Key Concepts:**

- **Ubiquitous Language:** Shared terminology between business analysts and developers  
- **Bounded Contexts:** Clear separation of domain areas  
- **Aggregates:** Grouping of objects within a transactional boundary  
- **Domain Events:** Recording significant business occurrences  

**Implementation Recommendations:**

1. Create a domain glossary  
2. Identify the Core Domain  
3. Apply design patterns (Entities, Value Objects, Repositories)  
4. Implement an event bus for inter-context communication  

---

## Requirements Elicitation Methodologies

### User Stories

**Format:**  
`As a [role], I want [functionality] so that [business value]`

**Quality Criteria (INVEST):**

- **I**ndependent: Independent of other stories  
- **N**egotiable: Open to refinement and discussion  
- **V**aluable: Delivers tangible value  
- **E**stimable: Can be sized or estimated  
- **S**mall: Fits within a single iteration  
- **T**estable: Has clear acceptance criteria  

**Example:**  
*As a sales manager, I want to filter orders by date so that I can analyze weekly revenue.*  
**Acceptance Criteria:**  

- WHEN a date range is entered THEN the system SHALL display orders within that period  
- WHEN an invalid date is selected THEN the system SHALL show a helpful hint  

### Use Cases

**Standard Structure:**

```markdown
1. Name
2. Actors
3. Preconditions
4. Main Success Scenario (step-by-step sequence)
5. Alternative Flows
6. Postconditions
7. Exceptions
```

**Recommendations:**

- Limit the main flow to a maximum of 9 steps  
- Number alternative flows (e.g., 3a, 3b)  
- Each step must include an actor action and the system’s response  

---

## Documentation Standards

### Technical Documentation Requirements

| Element          | Recommendations                                                    | Anti-Patterns                                       |
| ---------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| **Structure**    | • Logical sequence • Consistent heading hierarchy                  | Mixing levels of detail                             |
| **Style**        | • Active voice • Precise phrasing                                  | Passive constructions ("must be done")              |
| **Terminology**  | • Glossary at the beginning • Consistent terminology               | Synonymy within the same document                   |
| **Visualization**| • Diagrams for complex processes • Data schemas                    | Excessive graphics without explanations             |

### Documentation Types and Their Standards

#### 1. API Documentation

**Required Elements:**

- Description of all endpoints with HTTP methods  
- Request/response examples in JSON/YAML  
- Error codes with explanations  
- Authentication parameters  
- Rate limits  

**Recommendation:** Auto-generate using Swagger/OpenAPI  

#### 2. User Documentation

**Structure:**

```markdown
- Quick Start: 5-minute guide
- Core Scenarios: Step-by-step instructions
- Advanced Features: In-depth exploration
- FAQ: Solutions to common issues
- Community links
```

#### 3. Architectural Documentation

**Required Sections:**

- Context diagram (C4 Model Level 1)  
- Container diagram (C4 Model Level 2)  
- Key architectural decisions (ADR)  
- Technology matrix  
- Architecture evolution roadmap  

---

These standards and methodologies should be adapted to the specific needs of each project, maintaining a balance between formality and practical applicability. Regular documentation reviews involving all stakeholders ensure its relevance and quality throughout the project lifecycle.
