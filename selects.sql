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

-- conteudo dos bolsos
SELECT
  pocket_content.slot_number AS slot_number,
  pocket.name AS pocket_name,
  trainer.name AS trainer_name, 
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
  pokemon_type.type
FROM pokemon_type
INNER JOIN pokemon ON pokemon_type.pokemon_id = pokemon.id
WHERE
  pokemon.name = 'pikachu';

-- evoluções pelo nome
SELECT
  pokemon_evolution.name
FROM pokemon_evolution
INNER JOIN pokemon ON pokemon_evolution.pokemon_id = pokemon.id
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