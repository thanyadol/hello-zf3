"use strict";
angular.module("angularGoogleMapsApp", ["ngAnimate", "ngSanitize", "uiGmapgoogle-maps", "hljs", "semverSort", "ui.router"]), angular.module("angularGoogleMapsApp").controller("MainCtrl", ["$scope", "$github", "$log", "analytics", function(a, b, c, d) {
    var e = "https://rawgit.com/angular-ui/angular-google-maps/%REF%/dist/angular-google-maps.min.js",
        f = "master";
    a.map = {
        center: {
            latitude: 40.7081,
            longitude: -74.0041
        },
        zoom: 13,
        options: {
            disableDefaultUI: !0,
            mapTypeControl: !1,
            tilt: 45
        }
    }, a.marker = {
        id: 0,
        coords: {
            latitude: 40.7081,
            longitude: -74.0041
        },
        options: {
            animation: 1
        }
    }, a.dlClick = function() {
        d.trackEvent("click", "download")
    }, b.getTags().then(function(b) {
        a.latestTag = {}, b && b.length && (a.latestTag = _.filter(b, function(a) {
            return 0 >= a.name.indexOf("SNAPSHOT") && 0 >= a.name.indexOf("X")
        })[0]), a.downloadUrl = e.replace("%REF%", a.latestTag.name)
    }, function(b) {
        c.error("could not fetch latest tag; falling back to " + f, b), a.latestTag = {
            name: f
        }, a.downloadUrl = e.replace("%REF%", f)
    })
}]), angular.module("angularGoogleMapsApp").controller("QuickstartCtrl", ["$scope", function(a) {}]), angular.module("angularGoogleMapsApp").controller("FAQCtrl", ["$scope", "$anchorScroll", "$location", function(a, b, c) {
    a.gotoAnchor = function(a) {
        c.hash(a), b()
    }
}]), angular.module("angularGoogleMapsApp").constant("directiveList", ["google-map", "drawing-manager", "free-draw-polygons", "circle", "layer", "map-control", "map-type", "marker", "marker-label", "markers", "polygon", "polygons", "polyline", "polylines", "rectangle", "search-box", "window", "windows"]).constant("providerList", ["GoogleMapApi"]).constant("serviceList", ["Async", "Logger", "IsReady", "PropMap", "Promise"]).config(["$stateProvider", "directiveList", "providerList", "serviceList", function(a, b, c, d) {
    [{
        modules: b,
        loc: "directive/"
    }, {
        modules: c,
        loc: "provider/"
    }, {
        modules: d,
        loc: "service/"
    }].forEach(function(b) {
        b.modules.forEach(function(c) {
            ! function(c) {
                a.state("api." + c, {
                    url: "/" + c,
                    templateUrl: "views/" + b.loc + c + ".html"
                })
            }(c)
        })
    })
}]).controller("ApiCtrl", ["$scope", "$rootScope", "$location", "$state", "directiveList", "providerList", "serviceList", "$anchorScroll", function(a, b, c, d, e, f, g, h) {
    "api" === d.current.name && d.go("api." + f[0]), a.providers = f, a.services = g, a.directives = e, a.current = f[0], a.current = d.$current.name, b.$on("$stateChangeSuccess", function(b, c) {
        a.current = d.$current.name.substring(4)
    }), a.scrollTo = function(a) {
        c.hash(a), h()
    }, a.query = "", a.$watch(function() {
        return c.hash()
    }, function(a, b) {
        a !== b && $("#content" + a).collapse("show")
    })


}]), angular.module("angularGoogleMapsApp").controller("DemoCtrl", ["$scope", "$timeout", function(a, b) {
    a.tab = "status", a.map = {
        center: {
            latitude: 40.47,
            longitude: -73.85
        },
        zoom: 8,
        markers: [{
            id: 0,
            coords: {
                latitude: 41,
                longitude: -75
            },
            title: "Marker 1"
        }, {
            id: 1,
            coords: {
                latitude: 40,
                longitude: -74.5
            },
            title: "Marker 2"
        }],
        polyline: {
            path: [{
                latitude: 41,
                longitude: -75
            }, {
                latitude: 40,
                longitude: -74.5
            }, {
                latitude: 40.47,
                longitude: -73.85
            }, {
                latitude: 41.2,
                longitude: -74.2
            }],
            clickable: !0,
            editable: !0,
            geodesic: !0,
            draggable: !0
        }
    }, b(function() {
        a.map.markers.push({
            id: 3,
            coords: {
                latitude: 40.2,
                longitude: -74.3
            },
            title: "Marker 3"
        })
    }, 4e3)

    
}]), angular.module("angularGoogleMapsApp").controller("HeadlinesCtrl", ["$scope", "$http", "$log", "$interval", "headlinesFetchInterval", function(a, b, c, d, e) {
    function f() {
        b({
            method: "GET",
            url: "headlines.json"
        }).then(function(b) {
            a.headlines = b.data.items, a.count = b.data.items.length, c.debug("headlines: fetched", b.data.items.length, "headlines")
        }, function(a) {
            c.error("could not fetch headlines", a.status)
        })
    }
    var g = 3,
        h = 3;
    c.debug("headlines: fetch updates every " + e / 1e3 / 60 + " minute(s)"), d(f, e).then(function() {}, function(a) {
        c.error("an error has occured in interval", a)
    }, function(a) {
        c.info("fetched headlines")
    }), a.displayed = function() {
        return _.take(_.uniq(a.headlines, function(a) {
            return a.title
        }), g)
    }, a.loadMore = function() {
        g += h
    }, f.apply(this, [])
}]), angular.module("angularGoogleMapsApp").controller("FooterCtrl", ["$scope", "$log", "$q", "$github", function(a, b, c, d) {
    var e = !1;
    e || (c.all([d.getAllCommits(), d.getContributors(), d.getIssues(), d.getEvents()]).then(function(b) {
        var c = b[0],
            e = b[1],
            f = b[2],
            g = b[3];
        angular.extend(a, {
            github: {
                branch: d.getBranch(),
                commits: {
                    latest: c.length ? c[c.length - 1] : null,
                    all: c
                },
                issuesCount: f.length,
                issues: f,
                contributors: e,
                events: g
            }
        })
    }, function(c) {
        b.error(c), a.github = null
    }), e = !0), a.thisYear = (new Date).getFullYear(), a.eventLabel = function(a) {
        var b = a.payload;
        switch (a.type) {
            case "WatchEvent":
                return "starred this repository";
            case "CreateEvent":
                return "created " + b.ref_type + " " + b.ref;
            case "ForkEvent":
                return "forked this repository";
            case "PushEvent":
                return "pushed " + b.size + " commit(s) to " + b.ref.replace("refs/heads/", "");
            case "IssueCommentEvent":
                return "commented on issue " + b.issue.number;
            case "DeleteEvent":
                return "deleted " + b.ref_type + " " + b.ref;
            case "PullRequestEvent":
                return b.action + " pull request " + b.pull_request.number;
            case "IssuesEvent":
                return b.action + " issue " + b.issue.number;
            case "PullRequestReviewCommentEvent":
                return 'commented on a <a href="' + b.comment.html_url + '" rel="external">pull request</a>';
            case "GollumEvent":
                var c = b.pages && b.pages.length ? b.pages[0] : null;
                return c ? c.action + ' page <a href="' + c.html_url + '" rel="external">' + c.title + "</a> on the wiki" : "[api data error]";
            case "CommitCommentEvent":
                return "commented on commit " + b.comment.commit_id.substring(0, 8)
        }
        return "TODO (" + a.type + ")"
    }
}]), angular.module("angularGoogleMapsApp").controller(["$scope", "$log", "$location", "NotFoundCtrl", function(a, b, c) {
    a.requestedUrl = c.search().url
}]), angular.module("angularGoogleMapsApp").controller("ChangeLogCtrl", ["$scope", "$log", "changelog", function(a, b, c) {
    var d = [];
    for (var e in c) {
        var f = c[e];
        d.push({
            tag: e,
            commits: _.groupBy(f, function(a) {
                return a.author
            })
        })
    }
    a.changelog = d
}]), angular.module("angularGoogleMapsApp").provider("$github", function() {
    function a(a, e, f) {
        function g(b, c) {
            var d = i + "/" + b + "?callback=JSON_CALLBACK";
            return c && angular.forEach(c, function(a, b) {
                null != a && (d += "&" + b + "=" + a)
            }), a.debug("github: api url", d), d
        }

        function h(b, c) {
            var d = f.defer();
            return e({
                cache: !0,
                method: "JSONP",
                url: g(b, angular.extend({}, j, c))
            }).then(function(c) {
                a.debug("github:", b, "(" + (c.data.data ? c.data.data.length : 0) + ")", c.data.data), d.resolve(c.data.data)
            }, function(c) {
                a.error("github:", b, c), d.reject(c)
            }), d.promise
        }
        var i = "https://api.github.com/repos/" + b + "/" + c,
            j = d ? {
                sha: d,
                per_page: 1e3
            } : null;
        this.getRepository = function() {
            return c
        }, this.getBranch = function() {
            return d
        }, this.getCollaborators = function() {
            return h("collaborators", {})
        }, this.getContributors = function() {
            return h("contributors", {})
        }, this.getCommits = function() {
            return h("commits", {
                per_page: 10
            })
        }, this.getAllCommits = function() {
            var a = f.defer();
            return h("branches", {
                sha: null
            }).then(function(b) {
                var c = [];
                angular.forEach(b, function(a) {
                    var b = f.defer();
                    c.push(b.promise), h("commits", {
                        per_page: 10,
                        sha: a.name
                    }).then(function(a) {
                        b.resolve(a)
                    }, function(a) {
                        b.reject(a)
                    })
                }), f.all(c).then(function(b) {
                    var c = _.flatten(b);
                    _.sortBy(c, function(a) {
                        return -Date.parse(a.commit.committer.date)
                    });
                    a.resolve(_.flatten(b))
                }, function(b) {
                    a.reject(b)
                })
            }, function(b) {
                a.reject(b)
            }), a.promise
        }, this.getIssues = function() {
            return h("issues", {})
        }, this.getEvents = function() {
            return h("events", {})
        }, this.getTags = function() {
            return h("tags", {})
        }
    }
    var b = null,
        c = null,
        d = null;
    this.repository = function(a) {
        return a ? (c = a, this) : c
    }, this.username = function(a) {
        return a ? (b = a, this) : b
    }, this.branch = function(a) {
        return a ? (d = a, this) : d
    }, this.$get = ["$log", "$http", "$q", function(b, c, d) {
        return new a(b, c, d)
    }]
}), angular.module("angularGoogleMapsApp").provider("analytics", function() {
    var a = null,
        b = !0;
    this.trackingCode = function() {
        return arguments.length ? (a = arguments[0], this) : a
    }, this.trackViewChange = function() {
        return arguments.length ? (b = arguments[0], this) : b
    }, this.$get = ["$window", "$log", "$rootScope", "$document", "$location", function(c, d, e, f, g) {
        var h = !1,
            i = function() {
                !h && c.ga && (c.ga("create", a, "auto"), h = !0)
            },
            j = function(a) {
                d.debug("analytics: tracking page view", a), i(), c.ga && c.ga("send", "pageView", a)
            },
            k = function(a, b) {
                d.debug("analytics: tracking event", {
                    name: a,
                    value: b
                }), i(), c.ga && c.ga("send", "event", "button", "click", "download library")
            };
        return b && (d.info("analytics: telling analytics service to track view changes"), e.$on("$routeChangeSuccess", function() {
            j(g.path())
        }), e.$on("$routeChangeError", function() {
            j(g.path())
        })), {
            trackPageView: j,
            trackEvent: k
        }
    }]
}), angular.module("angularGoogleMapsApp").factory("formPostData", ["$document", function(a) {
    return function(b, c) {
        var d = angular.element('<form style="display: none;" method="post" action="' + b + '" target="_blank"></form>');
        angular.forEach(c, function(a, b) {
            var c = angular.element('<input type="hidden" name="' + b + '">');
            c.attr("value", a), d.append(c)
        }), a.find("body").append(d), d[0].submit(), d.remove()
    }
}]).factory("openPlnkr", ["formPostData", "$http", "$q", function(a, b, c) {
    return function(d) {
        function e(a, b) {
            return a.content.indexOf(b)
        }

        function f(a) {
            return a.filter(function(a) {
                return "index.html" === a.name
            })[0]
        }

        function g(a, b, c) {
            a.content = a.content.substring(0, b) + c + a.content.substring(b)
        }

        function h(a, b, c, d) {
            var h = a.filter(b),
                i = f(a),
                j = e(i, c),
                k = [];
            h.map(function(a) {
                k.push(d.replace("$file", a.name))
            }), g(i, j, k.join("\n"))
        }

        function i(a) {
            var b = function(a) {
                    return ".js" === a.name.substring(a.name.length - 3)
                },
                c = "<script type='text/javascript' src='$file'></script>",
                d = "<!--script-->";
            h(a, b, d, c)
        }

        function j(a) {
            var b = "<!--example-->",
                c = f(a),
                d = e(c, b),
                h = -1,
                i = a.filter(function(a, b) {
                    return "example.html" === a.name && (h = b, !0)
                })[0];
            g(c, d, i.content), delete a[h]
        }
        var k = "Angular Google Maps Example";
        b.get(d + "/manifest.json").then(function(a) {
            return a.data
        }).then(function(a) {
            var e = [],
                f = a.name.split("-");
            return f.unshift("AngularJS"), angular.forEach(f, function(a, b) {
                f[b] = a.charAt(0).toUpperCase() + a.substr(1)
            }), k = f.join(" - "), angular.forEach(a.files, function(a) {
                e.push(b.get(d + "/" + a, {
                    transformResponse: []
                }).then(function(b) {
                    return "index.html" === a && (a = "example.html"), "../base/plnkr.html" === a && (a = "index.html"), {
                        name: a,
                        content: b.data
                    }
                }))
            }), c.all(e)
        }).then(function(b) {
            var c = {};
            i(b), j(b), angular.forEach(b, function(a) {
                a && a.name && (c["files[" + a.name + "]"] = a.content)
            }), c["files[style.css]"] || (c["files[style.css]"] = "/* style file */"), c["tags[0]"] = "angularjs", c["tags[1]"] = "example", c["tags[2]"] = "angular-google-maps", c.private = !0, c.description = k, a("http://plnkr.co/edit/?p=preview", c)
        })
    }
}]), angular.module("angularGoogleMapsApp").value("headlinesFetchInterval", 3e5).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$logProvider", "$githubProvider", "analyticsProvider", "$sceDelegateProvider", "hljsServiceProvider", function(a, b, c, d, e, f, g, h) {
    c.html5Mode(!1).hashPrefix("!"), d.debugEnabled(!1), e.username("angular-ui").repository("angular-google-maps").branch("master"), f.trackingCode("UA-34163232-1").trackViewChange(!0), g.resourceUrlWhitelist(["self"]), g.resourceUrlBlacklist(["https://rawgithub.com/**"]), h.setOptions({
        tabReplace: "    "
    }), a.state("home", {
        url: "/",
        templateUrl: "views/main.html",
        controller: "MainCtrl"
    }).state("quickstart", {
        url: "/quickstart",
        templateUrl: "views/quickstart.html",
        controller: "QuickstartCtrl"
    }).state("api", {
        url: "/api",
        templateUrl: "views/api.html",
        controller: "ApiCtrl",
        reloadOnSearch: !1
    }).state("demo", {
        url: "/demo",
        templateUrl: "views/demo.html",
        controller: "DemoCtrl"
    }).state("faq", {
        url: "/faq",
        templateUrl: "views/faq.html",
        controller: "FAQCtrl"
    }).state("changelog", {
        url: "/changelog",
        templateUrl: "views/changelog.html",
        controller: "ChangeLogCtrl",
        reloadOnSearch: !1,
        resolve: {
            changelog: ["$http", "$q", "$log", function(a, b, c) {
                var d = b.defer();
                return a({
                    method: "GET",
                    url: "changelog.json"
                }).then(function(a) {
                    d.resolve(a.data)
                }, function(a) {
                    c.error("could not get /changelog.json", a), d.reject(a)
                }), d.promise
            }]
        }
    }).state("not-found", {
        url: "/not-found",
        templateUrl: "views/404.html",
        controller: "NotFoundCtrl"
    }), b.otherwise("/")
}]).run(["$rootScope", "$log", "$location", function(a, b, c) {
    a.$location = c, a.$on("$routeChangeError", function(a, c, d, e) {
        b.error("could not change route", e)
    })
}]), angular.module("angularGoogleMapsApp").directive("affix", ["$log", function(a) {
    return {
        restrict: "A",
        link: function(b, c, d) {
            var e = {
                offset: {}
            };
            d.offsetTop && (e.offset.top = parseInt(d.offsetTop)), d.offsetBottom && (e.offset.bottom = parseInt(d.offsetBottom)), a.debug("affix options", e), angular.element(c).affix(e)
        }
    }
}]), angular.module("angularGoogleMapsApp").directive("runnableExample", ["openPlnkr", function(a) {
    return {
        restrict: "E",
        template: '<div><div><button ng-click="click(\'index\')">index.html</button><button ng-click="click(\'script\')">script.js</button><button style="float:right" ng-click="editPlnkr()">Edit in Plnkr</button></div><div ng-show="index"><pre ng-non-bindable></pre></div><div ng-show="script"><pre ng-non-bindable></pre></div><div style="width:100%; height: 350px; padding:4px;"><iframe style="width: 100%; height: 100%"></iframe></div></div>',
        scope: {
            example: "=example"
        },
        controller: ["$scope", "$element", "$http", function(b, c, d) {
            console.log("Example controller."), b.index = !0, b.script = !1;
            var e = window.location.pathname + "views/examples/";
            b.click = function(a) {
                var c = "index" === a;
                b.index = c, b.script = !c
            }, b.editPlnkr = function() {
                a(e + b.example)
            };
            var f = c.find("pre");
            d.get(e + b.example + "/index.html").then(function(a) {
                console.log("fetched index", a), f[0].innerText = a.data
            }), d.get(e + b.example + "/script.js").then(function(a) {
                console.log("fetched script", a), f[1].innerText = a.data
            });
            var g = c.find("iframe");
            g.attr("src", e + "base/base.html?example=" + b.example)
        }]
    }
}]), angular.module("angularGoogleMapsApp").directive("googleApi", ["$log", function(a) {
    return {
        restrict: "A",
        link: function(b, c, d) {
            a.debug("generating link to Google Maps API reference for " + d.googleApi);
            var e = angular.element(c);
            e.attr("href", "https://developers.google.com/maps/documentation/javascript/reference#" + d.googleApi).attr("rel", "external").attr("target", "_blank")
        }
    }
}]), angular.module("angularGoogleMapsApp").directive("rel", ["$log", function(a) {
    return {
        restrict: "A",
        link: function(a, b, c) {
            var d = angular.element(b);
            d.attr("rel").indexOf("external") !== -1 && d.attr("target", "_blank").addClass("link-external")
        }
    }
}]), angular.module("angularGoogleMapsApp").directive("share", ["$log", function(a) {
    return {
        restrict: "E",
        template: '<div class="share-button" ng-cloak></div>',
        replace: !0,
        link: function(b, c, d) {
            var e = angular.element(c),
                f = {};
            d.url && (f.url = d.url), d.text && (f.text = d.text), d.image && (f.image = d.image), d.appId && (f.app_id = d.appId), d.background && (f.background = d.background), d.color && (f.color = d.color), d.icon && (f.icon = d.icon), d.buttonText && (f.button_text = d.buttonText), d.flyout && (f.flyout = d.flyout), a.debug("share options", f);
            var g = e.share(f);
            e.data("ng-share", g)
        }
    }
}]);