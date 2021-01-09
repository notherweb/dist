/*
   Name : Nother query (js)
   Version : 1.0.0 (first)
   Powered by : Nother, llc
   Licensed under : Apache 2.0
   Created by : mohammad sefatullah on 9, Jan 2021

 # New features :
   * Create XMLHttpRequest,
   * Tracks GeoLocation lat, long and name
   * Size of a window for handle elements,
   * Create element fonts,
   * Load a function on window.
   * Create a custom alerts.

 # More features :
   * Using functions (Nother, nother) or signs ($, $n)
*/
/*
   if ("undefined" == typeof Nother) throw new TypeError("There have requires Nother query.");
*/
let $n;
let $;
let Nother, nother;
let NotherVersion;

(function(window) {
  Nother = function() {
    return true;
  };
  $n = new Nother(), $ = new Nother(), nother = new Nother(), NotherVersion = "1.0.0";
  (function() {
    this.ajax = function(ajax_option) {
      let ajax_setting;
      let method, url, data;
      let ajax_request;
      let fn = {};

      function isEmpty(object) {
        for (let x in object) {
          if (object.hasOwnProperty(x)) {
            return false;
          }
        }
        return true;
      }
      function urlEncode(object) {
        let urlData = '';
        if (!object) {
          return '';
        }
        for (let x in object) {
          urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
        }
        urlData = urlData.substr(0, (urlData.length - 1));
        return urlData;
      }
      if (ajax_option) {
        ajax_setting = ajax_option;
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax arguments are required.');
      }
      if (ajax_setting.method) {
        method = ajax_setting.method;
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax methods are required.');
      }
      if (ajax_setting.url) {
        url = ajax_setting.url;
        if (ajax_setting.cors == "anywhere") {
          url = "https://cors-anywhere.herokuapp.com/"+ajax_setting.url;
        }
      } else {
        throw new TypeError('Failed to load XMLHttpRequest. Ajax urls are required.');
      }

      data = ajax_setting.data || '';
      if (ajax_setting.method === 'GET' && data && !isEmpty(data)) {
        url = url + '?' + urlEncode(data);
      }

      try {
        ajax_request = new XMLHttpRequest();
      } catch (e) {
        try {
          ajax_request = new ActiveXObject('MSXML2.XMLHTTP');
        } catch(e) {
          ajax_request = new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
      ajax_request.open(method, url);
      if (ajax_setting.requestHeader) {
        for (let key in ajax_setting.setRequestHeader) {
          ajax_request.setRequestHeader(key, ajax_setting.setRequestHeader[key]);
        }
      }
      if (ajax_setting.credential) {
        ajax_request.withCredentials = true;
      }
      if (ajax_setting.method !== 'GET') {
        ajax_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      ajax_request.send(urlEncode(data));
      fn = {
        onload: function (success) {
          // handle IE8 IE9 CORS
          if (typeof(XDomainRequest) !== 'undefined') {
            let host = location.host,
            matchUrl = url.replace('https://', '').replace('http://', '');
            matchUrl = matchUrl.slice(0, matchUrl.indexOf('/'));
            if (url.indexOf('//') === 0 || matchUrl !== host) {
              let xdr = new XDomainRequest();
              xdr.open(method, url);
              xdr.onprogress = function () {
                // progress
              };
              xdr.ontimeout = function () {
                // timeout
              };
              xdr.onerror = function () {
                // error
              };
              xdr.onload = function() {
                if (success) {
                  success(JSON.parse(xdr.responseText));
                }
              };
              setTimeout(function () {
                xdr.send();
              }, 0);

              return;
            }
          }
          // handle IE8 IE9 CORS end
          ajax_request.onreadystatechange = function () {
            if (success) {

              if (ajax_request.readyState === 4) {
                if (ajax_request.status >= 200 && ajax_request.status <= 400) {
                  let section;
                  switch (ajax_setting.section) {
                    case 'object':
                      section = JSON.parse(ajax_request.responseText);
                      break;
                    case 'xml':
                      section = ajax_request.responseXML;
                      break;
                    case 'none':
                      section = ajax_request;
                      break;
                    case 'text':
                      section = ajax_request.responseText;
                      break;
                    default:
                      section = ajax_request;
                      break;
                  }
                  if (success) {
                    success(section);
                  }
                } else {
                  console.error(ajax_request.status+" Error!! Somethings is broken or error. ", ajax_request);
                }
              }
            } else {
              throw new TypeError('Failed to load XMLHttpRequest. Only 1 callbacks are required.');
            }
          };
        },
        onerror: function (error) {
          ajax_request.onerror = function() {
            if (error) {
              error(ajax_request.status, ajax_request.responseText);
            }
          };
        }
      };
      return fn;
    };
    this.geolocate = function() {
      let fn = {
        onchange: function (success, error) {
          const getPositionErrorMessage = code => {
            switch (code) {
              case 1:
                return 'Permission denied.';
                break;
              case 2:
                return 'Position unavailable.';
                break;
              case 3:
                return 'Timeout reached.';
                break;
              default:
                return 'An unknown error';
                break;
            }
          }
          if ('geolocation' in navigator === false) {
            console.error(new TypeError('Geolocation is not supported by your browser.'));
          }
          return navigator.geolocation.getCurrentPosition(function (position) {
            let req = new Nother().ajax({
              method: "GET",
              url: "https://us1.locationiq.com/v1/reverse.php?key=pk.841faf5c95235f9459953b664d1ec98c&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&format=json",
              section: "object"
            });
            req.onload(function(data) {
              result = data.display_name;
              return success(position.coords.latitude, position.coords.longitude, data.display_name, position);
            });
            req.onerror(function(e) {
              return success(position.coords.latitude, position.coords.longitude, "Not found", position);
            });
          }, function(e) {
            return error(getPositionErrorMessage(e.code));
          });
        },
      };
      return fn;
    };
    this.window = function () {
      let fn = {
        onsize: function(wdw) {
          let mobile,
          tablet,
          laptop,
          ipad,
          dekstop,
          otherwise;
          mobile = wdw.size1;
          tablet = wdw.size2;
          laptop = wdw.size4;
          ipad = wdw.size3;
          dekstop = wdw.size5;
          otherwise = wdw.other;

          if (mobile || tablet || laptop || ipad || dekstop || otherwise) {
            let onl = function() {
              if (window.innerWidth <= 400) {
                if (mobile) {
                  // mobile window
                  mobile(window);
                }
              } else if (window.innerWidth <= 870 && window.innerWidth >= 400) {
                if (tablet) {
                  // tablet window
                  tablet(window);
                }
              } else if (window.innerWidth <= 970 && window.innerWidth >= 870) {
                if (ipad) {
                  // ipad window
                  ipad(window);
                }
              } else if (window.innerWidth <= 1100 && window.innerWidth >= 970) {
                if (laptop) {
                  // laptop window
                  laptop(window);
                }
              } else if (window.innerWidth <= 1200 && window.innerWidth >= 1100) {
                if (dekstop) {
                  // dekstop window
                  dekstop(window);
                }
              } else {
                if (otherwise) {
                  // other window
                  otherwise(window);
                }
              }
            };
            if (document.body) onl();
            else window.onload = onl;
          } else {
            throw new TypeError("Failed to execute window. Only 1 arguments are required, but only 0 arguments are present.");
          }
        }
      };
      return fn;
    };
    this.fonts = function(element = document.body) {
      let fn = {
        onload: function( {
          family, size, weight, style, height, space, width, breaks, color
        }) {
          if (element) {
            if (family) {
              let fontLink = document.createElement("link");
              fontLink.rel = "stylesheet";
              fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family="+family+"&display=swap");
              let fontLinkAppend = function (argument) {
                document.head.appendChild(fontLink);
                element.style.fontFamily = family;
              };
              if (document.body) fontLinkAppend();
              else window.onload = fontLinkAppend;
            }
            if (size) {
              element.style.fontSize = size;
            }
            if (weight) {
              element.style.fontWeight = weight;
            }
            if (style) {
              element.style.fontStyle = style;
            }
            if (height) {
              element.style.lineHeight = height;
            }
            if (space) {
              element.style.letterSpacing = space;
            }
            if (width) {
              element.style.wordSpacing = width;
            }
            if (color) {
              element.style.color = color;
            }
            if (breaks) {
              switch (breaks) {
                case '1':
                  breaks = "auto";
                  break;
                case '2':
                  breaks = "loose";
                  break;
                case '3':
                  breaks = "normal";
                  break;
                case '4':
                  breaks = "strict";
                  break;
                default:
                  breaks = breaks;
                  break;
              }
              element.style.lineBreak = breaks;
            }
          } else {
            throw new TypeError("Failed to create fonts. Element arguments are required, but not present.");
          }
        }
      };
      return fn;
    };
    this.alert = function( {
      title, align, message, button
    }) {
      let styles = document.createElement("style");
      styles.type = "text/css";
      styles.innerHTML = `
      @import url("https://fonts.googleapis.com/css?family=Ubuntu");
      alert, alert * {
      font-family: "Ubuntu";
      }
      alert {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0,0,0,0.3);
      color: #333;
      text-align: left;
      }
      alert > top {
      position: fixed;
      top: 20px;
      left: 0;
      right: 0;
      }
      alert > middle {
      position: fixed;
      top: calc(40% - 2em);
      left: 0;
      right: 0;
      }
      alert > bottom {
      position: fixed;
      bottom: 20px;
      left: 0;
      right: 0;
      }
      alert > top, alert > middle, alert > bottom {
      width: 85%;
      height: auto;
      padding: 20px;
      background: #fff;
      margin: auto;
      animation: 0.15s alert-fade-in linear;
      }
      alert top > title, alert middle > title, alert bottom > title {
      font-size: 20px;
      display: block;
      margin-bottom: 10px;
      }
      alert top > message, alert middle > message, alert bottom > message {
      font-size: 17px;
      display: block;
      margin-bottom: 10px;
      }
      alert top > button, alert middle > button, alert bottom > button {
      font-size: 17px;
      width: auto;
      height: auto;
      padding: 7px;
      padding-left: 15px;
      padding-right: 15px;
      background: #f5072d;
      color: white;
      border-radius: 0.3rem;
      margin: auto;
      border: none;
      outline: none;
      float: right;
      }
      top, bottom, middle {
      border-radius: 0.3rem;
      }

      @keyframes alert-fade-in {
      from {
      opacity: 0;
      transform: scale(0.6);
      }
      to {
      opacity: 1;
      transform: scale(1.0);
      }
      }
      @keyframes alert-fade-out {
      from {
      opacity: 1;
      transform: scale(1.0);
      }
      to {
      opacity: 0;
      transform: scale(0.6);
      }
      }
      `;
      if (title && message && button && align) {
        let alertDiv = document.createElement("alert");
        let alertTop = document.createElement("top");
        let alertMiddle = document.createElement("middle");
        let alertBottom = document.createElement("bottom");
        let alertTitle = document.createElement("title");
        let alertMessage = document.createElement("message");
        let alertButton = document.createElement("button");

        alertTitle.innerHTML = title;
        alertMessage.innerHTML = message;
        alertButton.innerHTML = button;
        alertButton.onclick = function() {
          if (align == "top") {
            alertTop.style.animation = "0.15s alert-fade-out linear";
            setTimeout(function() {
              alertDiv.remove();
            }, 151);
          } else if (align == "center" || align == null) {
            alertMiddle.style.animation = "0.15s alert-fade-out linear";
            setTimeout(function() {
              alertDiv.remove();
            }, 151);
          } else if (align == "bottom") {
            alertBottom.style.animation = "0.15s alert-fade-out linear";
            setTimeout(function() {
              alertDiv.remove();
            }, 151);
          } else {
            throw new TypeError("Alert aligns must be top|middle|bottom, but not found.");
          }
        }
        let onloads = function() {
          document.body.appendChild(alertDiv);
          if (align == "top") {
            alertDiv.appendChild(alertTop);
            alertTop.appendChild(alertTitle);
            alertTop.appendChild(alertMessage);
            alertTop.appendChild(alertButton);
          } else if (align == "center" || align == null) {
            alertDiv.appendChild(alertMiddle);
            alertMiddle.appendChild(alertTitle);
            alertMiddle.appendChild(alertMessage);
            alertMiddle.appendChild(alertButton);
          } else if (align == "bottom") {
            alertDiv.appendChild(alertBottom);
            alertBottom.appendChild(alertTitle);
            alertBottom.appendChild(alertMessage);
            alertBottom.appendChild(alertButton);
          } else {
            throw new TypeError("Alert aligns must be top|middle|bottom, but not found.");
          }
        };
        if (document.body) onloads()
        else window.onload = onloads()
      } else {
        throw new TypeError("Failed to create alerts, 4 arguments must be required.");
      }
      let onl = function() {
        document.head.appendChild(styles);
      };
      if (document.body) onl()
      else window.onload = onl;
    };
    this.load = function (reg) {
      if ("function" === typeof reg) {
        if (document.body) {
          reg(document.body);
        } else {
          window.onload = function () {
            return reg(window);
          };
        }
      } else {
        throw new TypeError("Cannot read property load() of undefined");
      }
    }
  }).call(Nother.prototype);
  (function() {
    fetch("https://notherweb.github.io/dist/query@data/update.json").then(function (arg) {
      return arg.json();
    }).then(function (arg) {
      let latestV = JSON.parse(data.responseText).latest.version;
      if (data.responseText) {
        if (latestV >= NotherVersion) {
          return console.log("new VersionUpdate: A new version "+latestV+" is available. Use the new version for explore more. Your current version is Nother query "+NotherVersion);
        }
      }
    });
  }());
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Nother;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Nother;
    });
  } else if (!window.Nother) {
    window.Nother = Nother;
  }
} (typeof window !== 'undefined' ? window: this));
