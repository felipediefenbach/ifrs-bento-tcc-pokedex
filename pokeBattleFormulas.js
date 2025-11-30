/*
HP = floor(0.01 × (2 × Base + IV + floor(0.25 × EV)) × Level) + Level + 10
Where:
    Base = Base HP stat of the Pokémon species
    IV = Individual Values (0-15 for Gen I)
    EV = Effort Values (0-65535 max total)
    Level = Pokémon's current level

Example for Pikachu at level 50:
    Base HP: 35
    IV: 10 (random)
    EV: 5000 in HP
*/

/*
Pokémon Yellow Status Conditions:
    Burn - HP halved, attack halved
    Freeze - Can't move
    Paralysis - Speed quartered, may not move
    Poison - HP loss each turn
    Sleep - Can't move for 1-7 turns
    Fainted - Pokémon is KO'd
*/