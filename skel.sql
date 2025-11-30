-- create table trainer
CREATE TABLE trainer (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

INSERT INTO trainer (name) VALUES ('felipe diefenbach'); -- default treiner

-- create table pokemon
CREATE TABLE pokemon (
  trainer_id INT NULL,
  id INT PRIMARY KEY,
  name VARCHAR(100),
  height INT NULL,
  weight INT NULL,
  base_experience INT NULL,
  FOREIGN KEY (trainer_id) REFERENCES trainer(id)
);

-- create table types
CREATE TABLE pokemon_type (
    pokemon_id INT NULL,
    type_name VARCHAR(200) NULL,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table moves
CREATE TABLE pokemon_move (
  pokemon_id INT NULL,
  move_name VARCHAR(200) NULL,
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create tables abilitys
CREATE TABLE pokemon_ability (
    pokemon_id INT NULL,
    ability_name VARCHAR(200) NULL,
    slot INT NULL,
    is_hidden BOOLEAN NULL,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table stats
CREATE TABLE pokemon_stat (
    pokemon_id INT NULL,
    stat_name VARCHAR(200) NULL,
    base_stat INT NULL,
    effort INT NULL,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table evolutions
CREATE TABLE pokemon_evolution (
    pokemon_id INT NULL,
    evolution_name VARCHAR(200) NULL,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table poket
CREATE TABLE poket (
    id INT PRIMARY KEY AUTO_INCREMENT,
    treiner_id INT,
    slot_number INT,
    pokemon_id INT,
    pokemon_state INT,
    FOREIGN KEY (treiner_id) REFERENCES trainer(id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (pokemon_state) REFERENCES pokemon_state(id)
);

-- create table states
CREATE TABLE pokemon_state (
    id INT PRIMARY KEY AUTO_INCREMENT,
    state_name VARCHAR(255)
);

INSERT INTO pokemon_state (state_name) VALUES 
('burn'),
('freeze'), 
('paralysis'),
('poison'),
('sleep'),
('fainted');