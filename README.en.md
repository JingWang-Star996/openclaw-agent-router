# OpenClaw Agent Router

**Intelligent Agent Routing System** - Let OpenClaw automatically call the most suitable Agent

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🎯 Features

### 1. Automatic Routing
Automatically call the most suitable Agent based on task type:
- Game Design → AI Planner Team
- Data Analysis → AI Data Analyst
- Article Writing → Editorial Team
- Code Issues → AI Developer Team

### 2. Smart Recommendations
When automatic call conditions are not met, proactively recommend relevant Agents:
```
User: "I want to optimize the game's newbie guide"

System: "I can handle this myself, but these Agents might be more professional:
     - AI System Planner: Professional newbie flow design
     - AI Level Planner: Design newbie level pacing
     - AI UX Designer: Optimize newbie guide experience
     Which one should I call?"
```

### 3. Real-time Scanning
Real-time scan `agents/` folder, dynamically get available Agent list:
- ✅ New Agents immediately available
- ✅ Deleted Agents automatically失效
- ✅ Zero maintenance cost

### 4. Multi-Agent Collaboration
Complex tasks automatically decomposed, call multiple Agents to collaborate:
```
User: "Design a complete gacha system"

System automatically calls:
1. AI Chief Planner (coordination)
2. AI Numerical Planner (probability/pity)
3. AI System Planner (UI/flow)
4. AI Monetization Designer (payment design)
```

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/openclaw-agent-router.git

# Copy Skills to OpenClaw workspace
cp -r skills/* ~/.openclaw/workspace/skills/
```

### Configuration

Add to `~/.openclaw/openclaw.json`:

```json
{
  "tools": {
    "exec": {
      "retryLimit": {
        "maxAttempts": 3,
        "timeoutSeconds": 300,
        "detectLoop": true,
        "loopThreshold": 3,
        "onLimitReached": "stop_and_suggest"
      }
    }
  }
}
```

### Usage

Automatically enabled after installation, no extra configuration needed.

**Examples**:

```
User: "Analyze why day-1 retention is only 30%"
→ Auto-call AI Data Analyst + AI Numerical Planner

User: "Design a pet raising system"
→ Auto-call AI Chief Planner → distribute to numerical/system planners

User: "Write an article about combat system"
→ Auto-call Editorial Team (7 people)
```

---

## 📋 Routing Rules

| Task Type | Auto Call |
|-----------|-----------|
| Game Design/Numerical/System | AI Chief Planner → Professional Planners |
| Retention/Payment/Data Analysis | AI Data Analyst + AI Numerical Planner |
| Project Management/Schedule/Resources | PMO Project Manager |
| Article Writing/Weekly Report | Editorial Team/Weekly Report AI |
| Code/Technical | AI Chief Developer |
| Art/UX | AI Art Director + UX Designer |
| Human Resources | HR Department AI |
| Quality Management | Quality Department AI |
| Operations/Events | Operations Director + User Operations |

---

## 🏗️ Project Structure

```
openclaw-agent-router/
├── README.md                 # This document
├── LICENSE                   # MIT License
├── package.json              # Project configuration
├── src/                      # Source code
│   ├── scanner.js            # Agent real-time scanner
│   ├── router.js             # Routing core logic
│   ├── matcher.js            # Intelligent matching engine
│   └── index.js              # Unified entry point
├── skills/                   # OpenClaw Skills
│   ├── auto-agent-router/    # Auto routing Skill
│   └── agent-scanner/        # Real-time scanning Skill
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # Architecture design
│   ├── API.md                # API reference
│   └── EXAMPLES.md           # Usage examples
└── examples/                 # Example code
    ├── basic-usage.js        # Basic usage
    ├── advanced-routing.js   # Advanced routing
    └── multi-agent-collab.js # Multi-Agent collaboration
```

---

## 🔧 Core Modules

### 1. Agent Scanner

**Responsibility**: Real-time scan `agents/` folder, parse Agent information

**Input**: 
- `agents/` folder path

**Output**:
```javascript
[
  {
    name: 'AI Data Analyst',
    description: 'Professional game data analysis...',
    capabilities: ['data analysis', 'retention analysis', 'payment analysis'],
    keywords: ['data', 'retention', 'payment', 'analysis'],
    category: 'Operations'
  },
  // ...
]
```

**Cache Strategy**:
- Cache for 5 minutes in same conversation
- Avoid repeated scanning

---

### 2. Router

**Responsibility**: Routing decision core

**Flow**:
```
Task → Check auto-call conditions → Yes → Call Agent
                                      ↓ No
                                      Evaluate complexity
                                      ↓
                            Simple → Self-handle
                            Medium → Recommend 1-3 Agents
                            Complex → Recommend 3-5 Agents (collaboration)
```

**Auto-call Rules**:
| Task Type | Keywords | Call Agent |
|-----------|----------|------------|
| Game Design | design/gameplay/system/numerical | AI Planner Team |
| Data Analysis | retention/payment/CVR/data | AI Data Analyst |
| Project Management | schedule/progress/resource | PMO Manager |
| Article Writing | article/doc/weekly-report | Editorial Team |
| Code/Technical | code/bug/architecture | AI Developer |

---

### 3. Matcher

**Responsibility**: Multi-dimensional match tasks and Agents

**Match Dimensions**:
1. **Keyword Match** (10 points/keyword)
   - Task description contains Agent keywords
   
2. **Description Match** (20 points)
   - Agent responsibility description contains task keywords
   
3. **Category Match** (15 points)
   - Task type matches Agent category
   
4. **Capability Match** (5 points/capability)
   - Task matches Agent core capabilities

**Scoring Example**:
```
Task: "Analyze why day-1 retention is only 30%"

AI Data Analyst:
- Keyword match: data (+10), analysis (+10), retention (+10) = 30 points
- Description match: none = 0 points
- Category match: operations (+15) = 15 points
- Capability match: data analysis (+5) = 5 points
Total: 50 points
```

---

### 4. Recommender

**Responsibility**: Generate user-friendly recommendation text

**Output Format**:
```
I can handle this myself, but these Agents might be more professional:

1. **AI Data Analyst** (Operations)
   Professional game data analysis, including retention/payment/user behavior
   Match score: 50 points

2. **AI Numerical Planner** (Planning)
   Responsible for numerical modeling, balance design, payment numerical design
   Match score: 35 points

3. **AI System Planner** (Planning)
   Responsible for system design, requirement analysis, documentation
   Match score: 25 points

Which one should I call?
```

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Scan Speed | ~0.5 seconds (100 Agents) |
| Match Speed | <100ms |
| Cache Hit Rate | 85%+ (same conversation) |
| Routing Accuracy | 90%+ (based on tests) |

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test real Agent calls
npm run test:real
```

---

## 📚 Documentation

- [Architecture Design](./docs/ARCHITECTURE.md) - System architecture and design
- [API Reference](./docs/API.md) - Complete API reference
- [Usage Examples](./docs/EXAMPLES.md) - Real-world examples

---

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

### How to Contribute

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- **Inspiration**: OpenClaw multi-Agent collaboration requirements
- **Platform Support**: [OpenClaw](https://github.com/openclaw/openclaw)
- **Real-world Validation**: ZVP Design Agency AI Team (100+ Agents)

---

**Made with ❤️ for OpenClaw Community**

**Last Updated**: 2026-04-05
