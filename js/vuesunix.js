document.title = 'esUNIX';
var language = 'en';

Vue.component('bodycontent', {
    template: '#bodycontent',
    props: ['show', 'language', 'md', 'msg']
})

var app = new Vue({
    el: '#app',
    data: {
        title: 'esUNIX',
        sections: [
            { title: 'Main', link: 'home' },
            { title: 'Amazon Web Services', link: 'aws' },
            { title: 'UNIX & Linux', link: 'unix' },
            { title: 'Contact', link: 'contact' }
        ],
        countries: ['es', 'en'],
        flag: {},
        show: {},
        md: {},
        msg: {}
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
        },
        navstyle: function(active) {
            var vm = this;
            this.sections.forEach(function(sect) {
                sect.class = (sect.link == active.link ? 'active' : '');
                vm.$set(vm.show, sect.link, false);
            });
            window.location.hash = '#' + active.link;
            vm.$set(vm.show, active.link, true);
            vm.$forceUpdate();
        },
        showscroll: function() {
            var viewport = window.innerHeight;
            var doclen = document.body.clientHeight;
            console.log(viewport, doclen);

            return (doclen > viewport ? true : false);
        },
        updatelang: function(country) {
            language = country;
            this.updateflag();
        },
        updateflag: function() {
            var vm = this;
            this.countries.forEach(function(c) {
                var opaque = (c == language ? '1' : '0.4');
                var property = {'opacity':  opaque};
                vm.$set(vm.flag, c, property);
                vm.contentload();
            });
        }
    },
    mounted: function() {
        this.contentload();
        this.updateflag();
        this.navstyle({link: 'home' });
    }
});

// Not Vue related

function scrolldown() {
    window.scrollBy(0,window.innerHeight);
}

document.onscroll = function() {
    var elt = document.getElementById('scrolldown');
    var y = window.innerHeight + window.scrollY >= document.getElementById('app').clientHeight;

    elt.style.display = y ? 'none' : 'inline';
}
