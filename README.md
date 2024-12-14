# React Buddy Memory Allocation Simulator

This project is a **Buddy Memory Allocation Simulator** built with **React.js**. It demonstrates a memory management system where memory blocks are allocated and managed based on the **buddy system** algorithm. The simulator splits, allocates, and merges memory blocks dynamically.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- **Dynamic Memory Allocation**: Allocate memory in sizes rounded to the nearest power of two.
- **Buddy System Splitting**: Splits larger memory blocks into smaller buddy blocks when necessary.
- **Automatic Merging**: Free blocks are automatically merged when possible.
- **Time-Based Deallocation**: Allocated memory is freed after a certain time interval.
- **Visual Feedback**: Displays the memory pool with color-coded blocks:
  - Red: Allocated blocks.
  - Green: Free blocks.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-buddy-memory-simulator.git
   cd react-buddy-memory-simulator
