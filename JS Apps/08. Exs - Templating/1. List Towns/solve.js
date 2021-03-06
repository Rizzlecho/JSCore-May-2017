$(() => {
    const townsInput = $('#towns');
    const btnLoad = $('#btnLoadTowns');
    const targetList = $('#townsList');

    const context = {
        towns: []
    };

    const templates = {};

    btnLoad.click(loadTowns);

    async function loadTowns() {
        getContext();

        loadTemplates().then((data) => {
            registerTemplates(data);
            renderTowns();
        });

        registerTemplates(await loadTemplates());
        renderTowns();
    }

    function getContext() {
        context.towns = townsInput.val().split(',')
            .filter(town => town !== '')
            .map((townName) => ({ townName: townName.trim() }));
        townsInput.val('');
    }

    function loadTemplates() {
        return Promise.all([$.get('town.hbs'), $.get('townList.hbs')]);
    }

    function registerTemplates([town, townList]) {
        Handlebars.registerPartial('town', town);
        templates.townList = Handlebars.compile(townList);
    }

    function renderTowns() {
        targetList.html(templates.townList(context))
    }

});