CREATE TABLE `pessoa` (
  `n_id_pessoa` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome_pessoa` varchar(255),
  `n_tipoPessoa_tipoPessoa` int,
  `c_status_Pessoa` char,
  `s_foto_pessoa` mediumtext,
  `n_id_fornecedor` int
);

CREATE TABLE `telefone` (
  `n_id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_pessoa` int,
  `s_numero_telefone` varchar(255)
);

CREATE TABLE `tipoPessoa` (
  `n_tipoPessoa_tipoPessoa` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_tipoPessoa` varchar(255),
  `n_nivel_tipoPessoa` int
);

CREATE TABLE `fornecedor` (
  `n_id_fornecedor` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_fornecedor` varchar(255),
  `c_status_fornecedor` char,
  `s_logo_fornecedor` mediumtext
);

CREATE TABLE `contatoFornecedor` (
  `n_id_contatoFornecedor` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_fornecedor` int,
  `n_id_pessoa` int
);

CREATE TABLE `produto` (
  `n_codigo_produto` int PRIMARY KEY,
  `n_id_tipoProduto` int,
  `s_desc_produto` varchar(255),
  `n_id_fornecedor` int,
  `n_qtde_produto` int,
  `c_status_produto` char
);

CREATE TABLE `tipoProduto` (
  `n_id_tipoProduto` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_tipoProduto` varchar(255)
);

CREATE TABLE `movimentacao` (
  `n_id_movimentacao` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_pessoa` int,
  `c_tipo_movimentacao` char,
  `n_qtde_movimentacao` char,
  `dt_datahora_movimentacao` datetime
);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_tipoPessoa_tipoPessoa`) REFERENCES `tipoPessoa` (`n_tipoPessoa_tipoPessoa`);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `telefone` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);

ALTER TABLE `contatoFornecedor` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `contatoFornecedor` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);

ALTER TABLE `produto` ADD FOREIGN KEY (`n_id_tipoProduto`) REFERENCES `tipoProduto` (`n_id_tipoProduto`);

ALTER TABLE `produto` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `movimentacao` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);
