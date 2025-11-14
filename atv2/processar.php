<?php
/*
 Nota: este arquivo processar.php é usado quando você executa um servidor PHP.
 Se você quer "tudo local" (sem servidor) use a versão JavaScript que salva em localStorage (app.js).
 Para testar o PHP localmente execute: php -S localhost:8000 no diretório do projeto ou use XAMPP/WAMP.
*/

// Define que a resposta será em formato JSON e evita saída inesperada
header('Content-Type: application/json; charset=utf-8');
http_response_code(200);

// Desliga exibição de erros (mas mantém logging do PHP se configurado no servidor)
error_reporting(E_ALL);
ini_set('display_errors', '0');

try {
    // Recebe os dados do JavaScript de forma segura
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $preco = isset($_POST['preco']) ? trim($_POST['preco']) : '';

    // Normaliza preço
    $precoFloat = (float) str_replace(',', '.', $preco);

    // Validação dos dados
    if (empty($nome) || $precoFloat <= 0) {
        http_response_code(400);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Por favor, preencha o nome e um preço válido.'
        ]);
        exit;
    }

    // Tentativa de salvar em local com maior probabilidade de permissão
    $logDir = sys_get_temp_dir(); // ex: /tmp ou C:\Windows\Temp
    $logFile = rtrim($logDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'produtos_cadastrados.log';

    $dadosParaLog = "Produto: $nome | Preço: $precoFloat" . PHP_EOL;
    $bytes = @file_put_contents($logFile, $dadosParaLog, FILE_APPEND | LOCK_EX);

    if ($bytes === false) {
        // Falha ao salvar o log (provavelmente permissão). Retorna erro 500 com mensagem.
        http_response_code(500);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Falha ao salvar o produto no servidor. Verifique permissões de escrita.'
        ]);
        exit;
    }

    // Sucesso
    http_response_code(200);
    echo json_encode([
        'status' => 'sucesso',
        'mensagem' => "Produto '$nome' cadastrado com sucesso!"
    ]);
    exit;

} catch (Throwable $e) {
    // Em caso de erro inesperado, retorna JSON com código 500
    http_response_code(500);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Erro interno no servidor: ' . $e->getMessage()
    ]);
    exit;
}

?>