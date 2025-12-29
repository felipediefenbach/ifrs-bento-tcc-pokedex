-- bolsos pelo nome do treinador
SELECT 
  pocket.name as pocket_name
FROM pocket
INNER JOIN trainer ON pocket.trainer_id = trainer.id
WHERE trainer.name = 'felipedie';

-- conteudo dos bolsos
SELECT
  pocket_content.slot_number as slot_number,
  pocket.name as pocket_name,
  trainer.name as trainer_name, 
  pokemon.name as pokemon_name,
  pokemon_state.name as pokemon_state
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';

SELECT
  pocket_content.slot_number as slot_number, 
  pokemon.name as pokemon_name,
  pokemon_state.name as pokemon_state
FROM pocket_content
INNER JOIN pocket ON pocket_content.pocket_id = pocket.id
INNER JOIN trainer ON pocket_content.trainer_id = trainer.id
INNER JOIN pokemon ON pocket_content.pokemon_id = pokemon.id
INNER JOIN pokemon_state ON pocket_content.state_id = pokemon_state.id
WHERE 
  trainer.name = 'felipedie'
  AND pocket.name = 'padrao';


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