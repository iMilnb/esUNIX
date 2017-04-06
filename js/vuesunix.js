document.title = 'esUNIX';
var language = 'en';

var vheader = new Vue({
    el: '#vheader',
    data: {
        title: 'esUNIX',
        sections: [
            { title: 'Main', link: '#home' },
            { title: 'Amazon Web Services', link: '#aws' },
            { title: 'UNIX & Linux', link: '#unix' },
            { title: 'Contact', link: '#contact' }
        ]
    },
    methods: {
        navstyle: function(active) {
            this.sections.forEach(function(sect) {
              sect.class = (sect.link == active.link ? 'active' : '');
            });
            window.location.hash = active.link;
            window.location.reload();
        },
    }
});

Vue.component('bodycontent', {
    template: '#bodycontent',
    data: function() {
        var msg = {};
        var md = {};
        var currentroute = window.location.hash.substring(1);
        this.contentload();

        return { msg, md, currentroute };
    },
    methods: {
        contentload: function() {
            var vm = this;
            $.get('content/index_' + language + '.yaml', function(response) {
                yml = jsyaml.load(response);
                $.each(yml, function(k, v) {
                    if (k.startsWith('md_') === true) {
                        vm.$set(vm.md, k.substring(3), marked(v));
                    } else {
                        vm.$set(vm.msg, k, v);
                    }
                    if (k == 'title') {
                        document.title = v;
                    }
                });
            });
        }
    }
})

var vcontainer = new Vue({
    el: '#vcontainer',

    methods: {
        showscroll: function() {
            var viewport = window.innerHeight;
            var doclen = document.documentElement.clientHeight;

            return (doclen > viewport ? true : false);
        }
    }
});

var vfooter = new Vue({
    el: '#vfooter',
    data: {
        countries: ['es', 'en', 'fr'],
        flag: {},
        country: ''
    },

    methods: {
        updatelang: function(country) {
            language = country;
            console.log(language);
        }
    },

    computed: { function() {
            $.each(this.countries, function(c) {
                var opaque = (c == country ? '1' : '0.4');
                this.flag[c] = {'opacity': opaque};
            });
        }
    }
});
