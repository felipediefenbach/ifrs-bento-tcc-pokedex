-- bolsos pelo nome do treinador
SELECT 
  pocket.name AS pocket_name
FROM pocket
INNER JOIN trainer ON pocket.trainer_id = trainer.id
WHERE trainer.name = 'felipedie';

-- pocket id pelo nome e treinedor
SELECT 
  pocket.id AS pocket_id
FROM pocket
INNER JOIN trainer ON pocket.trainer_id = trainer.id
WHERE
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';

-- slot livres
SELECT
  pocket_content.slot_number AS slot_number
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';

-- remove slot
DELETE pocket_content
FROM pocket_content AS pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao'
  AND pocket_content.slot_number = 3;

-- move pokemon to another slot
UPDATE pocket_content AS pocket_content
JOIN pocket ON pocket_content.pocket_id = pocket.id
JOIN trainer ON pocket_content.trainer_id = trainer.id
SET pocket_content.pocket_id = 2
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao'
  AND pocket_content.slot_number = 1;

-- set move config in pocket_content
UPDATE pocket_content AS pocket_content
JOIN pocket ON pocket_content.pocket_id = pocket.id
JOIN trainer ON pocket_content.trainer_id = trainer.id
SET pocket_content.moves = 'one,two'
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao'
  AND pocket_content.slot_number = 1;

-- conteudo dos bolsos
SELECT
  pocket_content.slot_number AS slotNumber,
  pokemon.name AS pokemonName,
  pocket_content.level AS pokemonLevel,
  pokemon_state.name AS pokemonState,
  pocket.name AS pocketName,
  trainer.name AS trainerName
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';

SELECT
  pocket_content.slot_number AS slot_number, 
  pokemon.name AS pokemon_name,
  pokemon_state.name AS pokemon_state
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';

-- cruza a informação dos dados do pokemon com o pokemon do bolso
UPDATE pocket_content AS pocket_content
INNER JOIN pokemon_base_info ON pocket_content.pokemon_id = pokemon_base_info.pokemon_id
INNER JOIN pokemon_stat ON pocket_content.pokemon_id = pokemon_stat.pokemon_id
SET
  pocket_content.curr_exp = pokemon_base_info.base_exp,
  pocket_content.hp = pokemon_stat.hp,
  pocket_content.attack = pokemon_stat.attack,
  pocket_content.defense = pokemon_stat.defense,
  pocket_content.sattack = pokemon_stat.sattack,
  pocket_content.sdefense = pokemon_stat.sdefense,
  pocket_content.speed = pokemon_stat.speed
WHERE
  pocket_content.pokemon_id = 7;
  
-- informações base do pokemon pelo nome
SELECT
  pokemon_base_info.base_exp AS base_exp,
  pokemon_base_info.height AS height,
  pokemon_base_info.weight AS weight
FROM pokemon_base_info
INNER JOIN pokemon ON pokemon_base_info.pokemon_id = pokemon.id
WHERE 
  pokemon.name = 'pikachu';

-- tipos do pokemon por nome
SELECT
  pokemon_type.type AS type
FROM pokemon_type
INNER JOIN pokemon ON pokemon_type.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'pikachu';

-- evoluções pelo nome
SELECT
  pokemon_evolution.evolutions AS evolutions
FROM pokemon_evolution
INNER JOIN pokemon ON pokemon_evolution.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'pikachu';

-- moves por nome
SELECT
  pokemon_move.moves AS moves,
  pokemon_move.level AS level
FROM pokemon_move
INNER JOIN pokemon ON pokemon_move.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'pikachu';

-- stats pelo nome
SELECT
  pokemon_stat.hp AS hp,
  pokemon_stat.attack AS attack,
  pokemon_stat.defense AS defense,
  pokemon_stat.sattack AS sattack,
  pokemon_stat.sdefense AS sdefense,
  pokemon_stat.speed AS speed
FROM pokemon_stat
INNER JOIN pokemon ON pokemon_stat.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'pikachu';

-- adiciona mais bolsos
INSERT INTO pocket (trainer_id, name) VALUES 
(1,'computador'),
(1,'laboratorio');

-- adiciona pokemons
INSERT INTO pokemon VALUES
(4,'charmander'),
(14,'kakuna'),
(25,'pikachu'),
(26,'raichu');

-- adiciona pokemons ao bolso
INSERT INTO pocket_content VALUES
(1, 1, 1, 4, 1),
(1, 1, 2, 14, 1),
(1, 1, 3, 25, 1),
(1, 1, 4, 26, 1);

-- define qnt xp pro prox nivel
UPDATE 
  pocket_content
SET 
  level_exp = 1
WHERE
  pokemon_id = 1;

-- level by name
SELECT 
  pocket_content.level AS level
FROM pocket_content
INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'bulbasaur';


SELECT
  pocket_content.slot_number AS slot_number
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';


SELECT
  pocket_content.slot_number AS slot_number
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
WHERE 
  trainer.name = 'machine'
  AND pocket.name = 'padrao';