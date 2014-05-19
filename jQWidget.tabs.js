$.widget("custom.tabs", { 
    options: {
        selected: 0,
        evt: "click"
    },
    _create: function() {
        var elem = this.element;
        this._bindTabs(elem);
        this._setActiveTab(elem);
    },
    _bindTabs: function(elem) {
        var tabsContainer = elem.children(':eq(0)');
        var tabs = tabsContainer.children();
        var tabsContentContainer = elem.children(':eq(1)');
        var tabContent = tabsContentContainer.children();

        tabs.on("mouseover", function(event) {
            $(this).hasClass("active") ? $(this).removeClass("onover") : $(this).addClass("onover");
            event.stopPropagation();
        });
        tabs.on("mouseout", function(event) {
            $(this).removeClass("onover");
            event.stopPropagation();
        });
        
        tabs.on(this.options.evt, function(event) {
            tabContent.each(function() {
                $(this).hide();
            });

            tabs.each(function() {
                $(this).removeClass("active").css("cursor", "pointer").addClass("inactive");
            });

            $(this).addClass("active").removeClass("inactive onover");
            $(tabContent.get(tabs.index(this))).css("display") == "none" ? $(tabContent.get(tabs.index(this))).fadeIn() : "";
            event.stopPropagation();
            event.preventDefault();
        });

    },
    _setActiveTab: function(elem) {
        var tabsContainer = elem.children(':eq(0)');
        var tabs = tabsContainer.children();
        var tabsContentContainer = elem.children(':eq(1)');
        var tabContent = tabsContentContainer.children();
        var self = this;
        
        tabs.each(function() {
            $(this).css("cursor", "pointer");
            $(this).addClass("inactive");
            $(tabs.get(self.options.selected)).removeClass("inactive").addClass("active");
        });

        tabContent.each(function() {
            $(this).hide();
            $(tabContent.get(self.options.selected)).show();
        });
        
    },
    _destroy: function() {
        this.element = null;
    }

});
