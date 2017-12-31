$(function() {
  
    $('.prompt').html('root@lekssays:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
  // Update the clock every second
  setInterval(function() {
    function r(cls, deg) {
      $('.' + cls).attr('transform', 'rotate('+ deg +' 50 50)')
    }
    var d = new Date()
    r("sec", 6*d.getSeconds())  
    r("min", 6*d.getMinutes())
    r("hour", 30*(d.getHours()%12) + d.getMinutes()/2)
  }, 1000);
  
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
    'clear', 'date', 'echo', 'help', 'uname', 'whoami', 'education', 'security', 'programming', 'interests', 'contact', 'blog'
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
        case 'date':
          output( new Date() );
          break;
        case 'echo':
          output( args.join(' ') );
          break;
        case 'help':
          output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'uname':
          output(navigator.appVersion);
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
      output('<h1>Ahmed Lekssays</h1><h3>Author, Speaker, and Security Researcher<br>I regulary share my thought on my blog: <a href=\"https://blog.lekssays.com/\">https://blog.lekssays.com</a></h3><p>Enter "help" for more information.</p><p>' + new Date() + ' -- This website is built with love <3</p>');
    },
    output: output
  }
};
