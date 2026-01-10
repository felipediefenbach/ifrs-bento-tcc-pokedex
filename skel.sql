-- Drop and Create
DROP DATABASE IF EXISTS pokedex;
CREATE DATABASE IF NOT EXISTS pokedex CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Select DB
USE pokedex;

-- create table trainer
CREATE TABLE trainer (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

-- create table pocket
CREATE TABLE pocket (
  id INT PRIMARY KEY AUTO_INCREMENT,
  trainer_id INT,
  name VARCHAR(255),
  FOREIGN KEY (trainer_id) REFERENCES trainer(id)
);

-- create table pokemon_names
CREATE TABLE pokemon_names (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

-- create table pokemon
CREATE TABLE pokemon (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

-- create table pokemon_base_info
CREATE TABLE pokemon_base_info (
  pokemon_id INT,
  base_exp INT,
  height INT,
  weight INT,
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table types
CREATE TABLE pokemon_type (
    pokemon_id INT,
    type VARCHAR(200),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table moves
CREATE TABLE pokemon_move (
  pokemon_id INT,
  level INT,
  moves VARCHAR(200),
  FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table stats 
CREATE TABLE pokemon_stat (
    pokemon_id INT,
    hp INT,
    attack INT,
    defense INT,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table evolutions
CREATE TABLE pokemon_evolution (
    pokemon_id INT,
    evolutions VARCHAR(200),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

-- create table states
CREATE TABLE pokemon_state (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- create table pocket_content
CREATE TABLE pocket_content (
    pocket_id INT,
    trainer_id INT,
    pokemon_id INT,
    slot_number INT,
    moves VARCHAR(200) DEFAULT 'none,none,none,none',
    rm_moves VARCHAR(200) DEFAULT 'none',
    full_hp INT DEFAULT 0,
    curr_hp INT DEFAULT 0,
    attack INT DEFAULT 0,
    defense INT DEFAULT 0,
    curr_xp INT DEFAULT 0,
    level INT DEFAULT 1,
    FOREIGN KEY (trainer_id) REFERENCES trainer(id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (pocket_id) REFERENCES pocket(id)
);

INSERT INTO trainer (name) VALUES 
('felipedie'),
('machine');

INSERT INTO pocket (trainer_id, name) VALUES 
(1,'padrao'),
(1,'laboratorio'),
(2,'padrao'),
(2,'laboratorio');

INSERT INTO pokemon_names (name) VALUES
('bulbasaur'),
('ivysaur'),
('venusaur'),
('charmander'),
('charmeleon'),
('charizard'),
('squirtle'),
('wartortle'),
('blastoise'),
('caterpie'),
('metapod'),
('butterfree'),
('weedle'),
('kakuna'),
('beedrill'),
('pidgey'),
('pidgeotto'),
('pidgeot'),
('rattata'),
('raticate'),
('spearow'),
('fearow'),
('ekans'),
('arbok'),
('pikachu'),
('raichu'),
('sandshrew'),
('sandslash'),
('nidoran♀'),
('nidorina'),
('nidoqueen'),
('nidoran♂'),
('nidorino'),
('nidoking'),
('clefairy'),
('clefable'),
('vulpix'),
('ninetales'),
('jigglypuff'),
('wigglytuff'),
('zubat'),
('golbat'),
('oddish'),
('gloom'),
('vileplume'),
('paras'),
('parasect'),
('venonat'),
('venomoth'),
('diglett'),
('dugtrio'),
('meowth'),
('persian'),
('psyduck'),
('golduck'),
('mankey'),
('primeape'),
('growlithe'),
('arcanine'),
('poliwag'),
('poliwhirl'),
('poliwrath'),
('abra'),
('kadabra'),
('alakazam'),
('machop'),
('machoke'),
('machamp'),
('bellsprout'),
('weepinbell'),
('victreebel'),
('tentacool'),
('tentacruel'),
('geodude'),
('graveler'),
('golem'),
('ponyta'),
('rapidash'),
('slowpoke'),
('slowbro'),
('magnemite'),
('magneton'),
('farfetch''d'),
('doduo'),
('dodrio'),
('seel'),
('dewgong'),
('grimer'),
('muk'),
('shellder'),
('cloyster'),
('gastly'),
('haunter'),
('gengar'),
('onix'),
('drowzee'),
('hypno'),
('krabby'),
('kingler'),
('voltorb'),
('electrode'),
('exeggcute'),
('exeggutor'),
('cubone'),
('marowak'),
('hitmonlee'),
('hitmonchan'),
('lickitung'),
('koffing'),
('weezing'),
('rhyhorn'),
('rhydon'),
('chansey'),
('tangela'),
('kangaskhan'),
('horsea'),
('seadra'),
('goldeen'),
('seaking'),
('staryu'),
('starmie'),
('mr. mime'),
('scyther'),
('jynx'),
('electabuzz'),
('magmar'),
('pinsir'),
('tauros'),
('magikarp'),
('gyarados'),
('lapras'),
('ditto'),
('eevee'),
('vaporeon'),
('jolteon'),
('flareon'),
('porygon'),
('omanyte'),
('omastar'),
('kabuto'),
('kabutops'),
('aerodactyl'),
('snorlax'),
('articuno'),
('zapdos'),
('moltres'),
('dratini'),
('dragonair'),
('dragonite'),
('mewtwo'),
('mew');