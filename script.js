$(document).ready(function() {
    const API_KEY = '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'; // Replace with your ChatGPT API key
    const CHAT_CONTAINER_ID = 'chat-container';
    const CHAT_RESPONSE_ID = 'chat-response';

    const formatMessage = (message) => {
        const formattedMessage = message
          .replace(/\n/g, '<br>') // Replace line breaks with <br> tags
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Wrap **bold** text with <strong> tags
          .replace(/\*(.*?)\*/g, '<em>$1</em>') // Wrap *italic* text with <em> tags
          .replace(/```(.*?)```/gs, '<pre>$1</pre>') // Wrap ```code``` block with <pre> tags
          .replace(/__(.*?)__/g, '<u>$1</u>') // Wrap __underline__ text with <u> tags
          .replace(/~~(.*?)~~/g, '<del>$1</del>') // Wrap ~~strikethrough~~ text with <del> tags
          .replace(/\[heading1\](.*?)\[\/heading1\]/g, '<h1>$1</h1>') // Convert [heading1]...[/heading1] to <h1>
          .replace(/\[heading2\](.*?)\[\/heading2\]/g, '<h2>$1</h2>') // Convert [heading2]...[/heading2] to <h2>
          .replace(/\[heading3\](.*?)\[\/heading3\]/g, '<h3>$1</h3>') // Convert [heading3]...[/heading3] to <h3>
          .replace(/\[list\](.*?)\[\/list\]/gs, '<ul>$1</ul>') // Convert [list]...[/list] to <ul>
          .replace(/\[item\](.*?)\[\/item\]/g, '<li>$1</li>'); // Convert [item]...[/item] to <li>
    
        return formattedMessage;
      };
    
      const sendMessage = async (message) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a student.' }, { role: 'user', content: message }]
          })
        });
    
        const data = await response.json();
    
        const chatContainer = document.getElementById(CHAT_RESPONSE_ID);
        const chatMessage = document.createElement('div');
        chatMessage.innerHTML = formatMessage(data.choices[0].message.content);
        chatContainer.appendChild(chatMessage);
      };
    
      $('#chat-form').on('submit', function(event) {
        event.preventDefault();
        const message = $('#user-input').val();
    
        const chatContainer = document.getElementById(CHAT_CONTAINER_ID);
        const userMessage = document.createElement('div');
        userMessage.innerHTML = message;
        chatContainer.appendChild(userMessage);
    
        sendMessage(message);
    
        $('#user-input').val('');
      });
    });