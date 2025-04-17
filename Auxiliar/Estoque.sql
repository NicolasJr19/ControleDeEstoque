CREATE TABLE `usuario` (
  `n_id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome_usuario` varchar(255),
  `c_tipo_usuario` char,
  `c_status_usuario` char
);

CREATE TABLE `telefone` (
  `n_id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_usuario` int,
  `s_ddd_telefone` varchar(255),
  `s_numero_telefone` varchar(255)
);

ALTER TABLE `telefone` ADD FOREIGN KEY (`n_id_usuario`) REFERENCES `usuario` (`n_id_usuario`);
