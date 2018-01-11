$(function() {
  
    $('.prompt').html('root@lekssays:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
});

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'whoami', 'education', 'security', 'programming', 'interests', 'love', 'media' ,'contact', 'blog', 'clear', 'help' 
  ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'help':
          var result = "<h2>Help</h2><p><b>whoami</b>: display all my information.<br><b>education</b>: display all my information about my education.<br><b>security</b>: display all my information about my achievements in security.<br><b>programming</b>: display all my information about my achievements in programming.<br><b>interests</b>: display all my interests.<br><b>love</b>: are you curious about my love?<br><b>media</b>: display where I have been mentioned.<br><b>contact</b>: Say hi<br><b>blog</b>: Link of my blog<br><b>clear</b>: clear terminal<br><b>help</b>: display this menu.</p>";
          output(result);
          break;
        case 'education':
          var result = "<h3>Education</h3>"+"<p>Master of Science in Software Engineering at Al Akhawayn University in Ifrane, Morocco with minors in Communication and Mathematics (In progress)<br>Baccalaureate in Physics in 2014 from Al Atlas High School in Douirane, Morocco";
          output(result);
          break;
        case 'security':
          var result = "<h3>Information Security Analyst</h3><p>Acknowledged by WhatsApp after finding a security issue in their iOS Application.<br>Acknowledged by Twitter after finding a security issue in their iOS Application.<br>Author at InfoSec Institute<br>Acknowledged by Al Akhawayn University in Ifrane after finding a security issues in their Web Applications.<br>Acknowledged by Mohammed First University in Oujda after finding a security issue in their Web Application.<br>Acknowledged by Banque Centrale Populaire after finding a security issue in their Web Application.<br>Security Analyst at Al Akhawayn University in Ifrane, Morocco<br>Security Analyst at Vul9 Security Solutions<br><h3>Speaker in Several Cyber Security and IT Conferences</h3>International Conference on Big Data, Cloud, and Application with a paper entitled “Build a Simple Cloud Server using the Open Hardware Technology” in Tetouan, Morocco<br>Network Security – Ecole Hassania Des Travaux Publiques<br>JNJD INPT – INPT in Rabat<br>OWASP AppSec Africa 2017 in Casablanca, Morocco<br>WhiteHat Camp in Marrakech, Morocco<br>National Conference on Cyber Security and Digital Threats in Ifrane, Morocco<p>";
          output(result);
          break;
        case 'programming':
          var result = "<h3>Competitive Programmer</h3><p>6th Place in the Moroccan Collegiate Programming Contest 2017 with my team \"Slowpoke\"<br>Finalist of the Arab Collegiate Programming Contest 2017 with my team \"Slowpoke\"<br>Judge and Problem Setter at Code IT 2016, Ecole Hassania des Traveaux Publics, Casablanca, Morocco<br>Problem Setter Girls Code I 2016 (ENSIAS, Rabat) and Girls Code II 2017 (UIR, Rabat)<br>Winner of the Moroccan Collegiate Programming Contest 2016 with my team “PastGlory“<br>Finalist of the Arab Collegiate Programming Contest 2016 with my team “PastGlory“ <br>Contestant in the Moroccan Collegiate Programming Contest 2015 with my team “return 0;“<p>"+"<h3> Web Developer and Entrepreneur</h3>Web Development Tutor – E-nitiate Summer Camp 2016<br>Web Development Tutor – Computer Science for Innovation Club – Web Development Workshops<br>NASA Apps Space Challenge – 1st Place in Morocco<br>Brackets Project – An Open-Source Contests Management Platform<br>Altair Project – An Open-Source API for Intelligent Drone Driving<br>oudadOS – An Open-Source Lightweight Operating System for Educational Purposes<br>More projects on my <a href=\"https://github.com/Lekssays\">Github</a></p>";
          output(result);
          break;
        case 'interests': 
          var result = "<h3>Interests</h3><p>Algorithms, Data Structures, Problem Solving, Cyber Security , Volleyball, Literature, Communication, Photography, Internet of Things , Operating Systems, Cloud Computing , Geometry , Big Data , Volunteering, Traveling, Open Source Technologies...</p>";
          output(result);
          break;
        case 'blog':
          var result = "<h3>I regulary share my thought on my <a href=\"https://blog.lekssays.com/\">Blog</a></h3>";
          output(result);
          break;
        case 'contact':
          var result = "<h3>Contact</h3><h4>Email: ahmed@lekssays.com<br>Twitter: @Lekssays<br>Instagram: lekssays</h4>";
          output(result);
          break;
        case 'whoami':
          var result = "<h1>Ahmed Lekssays</h1><p>Author, Speaker, and Security Researcher</p><p>I am 21 years old. I am from a small village near Imintanout called Douirane. I am a student at Al Akhawayn University in Ifrane, Morocco, security analyst, and  author. I am interested in algorithms, data structures, computer security, new technologies, and communication theories. I am an open-source activist. I love sharing code, love, and knowledge. I love blogging because it is a creative way to share knowledge, to meet new people, and to discover new cultures. I love operating systems because they teach you the core of computers.</p>" + "<h3>Information Security Analyst</h3><p>Acknowledged by WhatsApp after finding a security issue in their iOS Application.<br>Acknowledged by Twitter after finding a security issue in their iOS Application.<br>Author at InfoSec Institute<br>Acknowledged by Al Akhawayn University in Ifrane after finding a security issues in their Web Applications.<br>Acknowledged by Mohammed First University in Oujda after finding a security issue in their Web Application.<br>Acknowledged by Banque Centrale Populaire after finding a security issue in their Web Application.<br>Security Analyst at Al Akhawayn University in Ifrane, Morocco<br>Security Analyst at Vul9 Security Solutions<br>Speaker in Several Cyber Security and IT Conferences<br>International Conference on Big Data, Cloud, and Application with a paper entitled “Build a Simple Cloud Server using the Open Hardware Technology” in Tetouan, Morocco<br>Network Security – Ecole Hassania Des Travaux Publiques<br>JNJD INPT – INPT in Rabat<br>OWASP AppSec Africa 2017 in Casablanca, Morocco<br>WhiteHat Camp in Marrakech, Morocco<br>National Conference on Cyber Security and Digital Threats in Ifrane, Morocco<p>" + "<h3>Competitive Programmer</h3><p>6th Place in the Moroccan Collegiate Programming Contest 2017 with my team \"Slowpoke\"<br>Finalist of the Arab Collegiate Programming Contest 2017 with my team \"Slowpoke\"<br>Judge and Problem Setter at Code IT 2016, Ecole Hassania des Traveaux Publics, Casablanca, Morocco<br>Problem Setter Girls Code I 2016 (ENSIAS, Rabat) and Girls Code II 2017 (UIR, Rabat)<br>Winner of the Moroccan Collegiate Programming Contest 2016 with my team “PastGlory“<br>Finalist of the Arab Collegiate Programming Contest 2016 with my team “PastGlory“ <br>Contestant in the Moroccan Collegiate Programming Contest 2015 with my team “return 0;“<p>"+"<h3> Web Developer and Entrepreneur</h3>Web Development Tutor – E-nitiate Summer Camp 2016<br>Web Development Tutor – Computer Science for Innovation Club – Web Development Workshops<br>NASA Apps Space Challenge – 1st Place in Morocco<br>Brackets Project – An Open-Source Contests Management Platform<br>Altair Project – An Open-Source API for Intelligent Drone Driving<br>oudadOS – An Open-Source Lightweight Operating System for Educational Purposes<br>More projects on my <a href=\"https://github.com/Lekssays\">Github</a></p><h3>Interests</h3><p>Algorithms, Data Structures, Problem Solving, Cyber Security , Volleyball, Literature, Communication, Photography, Internet of Things , Operating Systems, Cloud Computing , Geometry , Big Data , Volunteering, Traveling, Open Source Technologies...</p>"
          output(result);
          break;
        case 'media':
          var result = "<h3>I was mentioned is several media in Morocco and abroad in different langauge.. Here are some:</h3><h2>Arabic</h2><blockquote>2M: <a href=\"https://www.youtube.com/watch?v=cJdjrgiKSuI\">https://www.youtube.com/watch?v=cJdjrgiKSuI</a></blockquote><blockquote>CNN Arabic: <a href=\"https://arabic.cnn.com/scitech/2015/08/01/morocco-young-white-hat\"> https://arabic.cnn.com/scitech/2015/08/01/morocco-young-white-hat</a></blockquote><blockquote>Imintanoute Press: <a href=\"http://www.imintanoutpress.com/الشاب-احمد-لكسايس-ابن-منطقة-ادويران-يف\">http://www.imintanoutpress.com/الشاب-احمد-لكسايس-ابن-منطقة-ادويران-يف</a></blockquote><blockquote>Goud: <a href=\"http://www.goud.ma/هادو-كيشرفوا-لبلاد-أحمد-لكسايس-يافع-مغ-79267/\">http://www.goud.ma/هادو-كيشرفوا-لبلاد-أحمد-لكسايس-يافع-مغ-79267/</a></blockquote><blockquote>Al Arabiya: <a href=\"http://www.alarabiya.net/ar/technology/2015/08/03/واتس-آب-تشكر-باحثا-مغربيا-على-حماية-ملايين-المستخدمين-من-ثغرة.html\">http://www.alarabiya.net/ar/technology/2015/08/03/واتس-آب-تشكر-باحثا-مغربيا-على-حماية-ملايين-المستخدمين-من-ثغرة.html</a></blockquote><blockquote>Febrayer: <a href=\"https://www.febrayer.com/227366.html\">https://www.febrayer.com/227366.html</a></blockquote><blockquote>Al Yaoume 24: <a href=\"http://m.alyaoum24.com/346429.html\">http://m.alyaoum24.com/346429.html</a></blockquote><h2>French</strong></h2><blockquote>Medi1TV:<a href=\"http://www.medi1tv.com/fr/ahmed-lekssays-explique-comment-il-a-découvert-une-faille-de-sécurité-sur-infos-42987\">http://www.medi1tv.com/fr/ahmed-lekssays-explique-comment-il-a-découvert-une-faille-de-sécurité-sur-infos-42987</a></blockquote><blockquote>Telquel:<a href=\"http://telquel.ma/2015/07/30/marocain-19-ans-decouvre-faille-whatsapp_1457919\">http://telquel.ma/2015/07/30/marocain-19-ans-decouvre-faille-whatsapp_1457919</a></blockquote><blockquote>Welovebuzz: <a href=\"http://www.welovebuzz.com/un-marocain-de-19-ans-trouve-une-faille-sur-whatsapp/\">http://www.welovebuzz.com/un-marocain-de-19-ans-trouve-une-faille-sur-whatsapp/</a></blockquote><blockquote>Oujda City: <a href=\"http://www.oujdacity.net/national-article-114580-fr/luniversite-al-akhawayn-difrane-au-rendez-vous-avec-la-5eme-edition-du-morrocan-collegiate-programming-contest.html\">http://www.oujdacity.net/national-article-114580-fr/luniversite-al-akhawayn-difrane-au-rendez-vous-avec-la-5eme-edition-du-morrocan-collegiate-programming-contest.html</a></blockquote><h2>English</h2><blockquote>Morocco World News: <a href=\"https://www.moroccoworldnews.com/2015/08/164726/moroccan-student-discovers-security-loophole-in-whatsapp/\">https://www.moroccoworldnews.com/2015/08/164726/moroccan-student-discovers-security-loophole-in-whatsapp/</a></blockquote><h2>Spanish</h2> <blockquote>ABC <a href=\"http://www.abc.es/tecnologia/moviles-aplicaciones/20150731/abci-whatsapp-apple-201507311532.html\">http://www.abc.es/tecnologia/moviles-aplicaciones/20150731/abci-whatsapp-apple-201507311532.html</a></blockquote><blockquote>Los Andes: <a href=\"http://losandes.com.ar/article/atencion-una-falla-en-whatsapp-para-iphone-permite-robar-todos-los-chats-y-contactos\">http://losandes.com.ar/article/atencion-una-falla-en-whatsapp-para-iphone-permite-robar-todos-los-chats-y-contactos</a></blockquote><blockquote>20Minutos <a href=\"http://www.20minutos.es/noticia/2526807/0/fallo-whatsapp/hackear-iphone/robar-chats/\">http://www.20minutos.es/noticia/2526807/0/fallo-whatsapp/hackear-iphone/robar-chats/</a></blockquote><h2>Dutch</h2><blockquote>Nieuws Marokko <a href=\"http://nieuws.marokko.nl/38033/marokkaanse-slimmerik-ontdekt-beveiligingslek-in-whatsapp/\">http://nieuws.marokko.nl/38033/marokkaanse-slimmerik-ontdekt-beveiligingslek-in-whatsapp/</a></blockquote><h2>Portuguese</h2><blockquote>Mundo Positivo: <a href=\"http://www.mundopositivo.com.br/noticias/dicaspositivo/20371316-falha_no_whatsapp_permite_roubar_conversa_e_dados_pessoais.html\">http://www.mundopositivo.com.br/noticias/dicaspositivo/20371316-falha_no_whatsapp_permite_roubar_conversa_e_dados_pessoais.html</a></blockquote><blockquote>Techtudo: <a href=\"http://www.techtudo.com.br/noticias/noticia/2015/08/whatsapp-tem-bug-que-permite-roubar-conversas-e-dados-de-contatos.html\">http://www.techtudo.com.br/noticias/noticia/2015/08/whatsapp-tem-bug-que-permite-roubar-conversas-e-dados-de-contatos.html</a></blockquote>";
          output(result);
          break;
        case 'love':
          output("<h3>Sabrinaa...</h3>");
          break;
        case 'sabrina':
            output("<h3>Love...</h3>");
            break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<h1>Ahmed Lekssays</h1><h3>Author, Speaker, and Security Researcher<br>I regulary share my thoughts on my blog: <a href=\"https://blog.lekssays.com/\">https://blog.lekssays.com</a></h3><p>Enter "help" for more information.</p><p> -- This website is built with love <3</p>');
    },
    output: output
  }
};
