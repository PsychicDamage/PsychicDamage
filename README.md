# PsychicDamage

An open source web based voxel based game.

> Focus now is on the engine.

## Engine

### Core

Includes ECMAScript level abstractions for memory, caching, and other OOP abstractions.

### Math

Houses the Linear Algebra math structure, most code is ripped off gl-matrix and fungi projects, it will also hold some bounding volume structures, some raycating logic, some space partitioning data structures.

### Physic

For now, this will house a broadphase AABB collision detection and resolution.

### Terrain

This module has no idea about the game, it only knows how to save block ids with block metadata in chunks and regions and that is it.

### GameLoop

Small timing class implementing a fixed game loop. *(Needs more details)*

### ECS

This module will provide a `World` class that can be used to interact with the entities in the game.

### ESBF

This is a module that provides a set of building blocks for compact binary serialization and deserialization. *(Needs more details)*
