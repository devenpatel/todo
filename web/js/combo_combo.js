jQuery.noConflict();
/***************************************************************************
*   Copyright (C) 2009 by Vladimir Kadalashvili                                       *
*   Kadalashvili.Vladimir@gmail.com                                                    *
*                                                                         *
*   This program is free software; you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation; either version 2 of the License, or     *
*   (at your option) any later version.                                   *
*                                                                         *
*   This program is distributed in the hope that it will be useful,       *
*   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
*   GNU General Public License for more details.                          *
*                                                                         *
*   You should have received a copy of the GNU General Public License     *
*   along with this program; if not, write to the                         *
*   Free Software Foundation, Inc.,                                       *
*   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
***************************************************************************/


;
(function() {
    jQuery.fn.sexyCombo = function(config) {
        //return;
        return this.each(function() {
            if ("SELECT" != this.tagName.toUpperCase()) {
                return;
            }
            new jQuerysc(this, config);
        });
    };
          
    //default config options
    var defaults = {
        //skin name
        skin: "sexy",
                    
        //this suffix will be appended to the selectbox's name and will be text input's name
        suffix: "__sexyCombo",
                    
        //the same as the previous, but for hidden input
        hiddenSuffix: "__sexyComboHidden",
                    
        //initial / default hidden field value.
        //Also applied when user types something that is not in the options list
        initialHiddenValue: "",
                    
        //if provided, will be the value of the text input when it has no value and focus
        emptyText: "",
                    
        //if true, autofilling will be enabled
        autoFill: false,
                    
        //if true, selected option of the selectbox will be the initial value of the combo
        triggerSelected: true,
                    
        //function for options filtering
        filterFn: null,
                    
        //if true, the options list will be placed above text input
        dropUp: false,
                    
        //separator for values of multiple combos
        separator: ",",
                    
        //all callback functions are called in the scope of the current sexyCombo instance
                    
        //called after dropdown list appears
        showListCallback: null,
                    
        //called after dropdown list disappears
        hideListCallback: null,
                    
        //called at the end of constructor
        initCallback: null,
                    
        //called at the end of initEvents function
        initEventsCallback: null,
                    
        //called when both text and hidden inputs values are changed
        changeCallback: null,
                    
        //called when text input's value is changed
        textChangeCallback: null,
        checkWidth: true
    };
          
    //constructor
    //creates initial markup and does some initialization
    jQuery.sexyCombo = function(selectbox, config) {
                    
        if (selectbox.tagName.toUpperCase() != "SELECT")
            return;
                    
        this.config = jQuery.extend({}, defaults, config || {});
                    
                    
                    
        this.selectbox = jQuery(selectbox);
        nameprefix = this.selectbox.attr("name");
        namesuffix = '';
        if(nameprefix.indexOf('[') > 0){
            nameprefix=nameprefix.substr(0,nameprefix.indexOf('['));
            namesuffix = nameprefix.substr(nameprefix.indexOf('['),nameprefix.indexOf(']'));
        }
        this.options = this.selectbox.children().filter("option");
                    
        this.wrapper = this.selectbox.wrap("<div>").
        hide().
        parent().
        addClass("combo").
        addClass(this.config.skin);
                    
        this.input = jQuery("<input type='text' />").
        appendTo(this.wrapper).
        attr("autocomplete", "off").
        attr("value", "").
        attr("name", nameprefix + this.config.suffix + namesuffix);
                    
        this.hidden = jQuery("<input type='hidden' />").
        appendTo(this.wrapper).
        attr("autocomplete", "off").
        attr("value", this.config.initialHiddenValue).
        attr("name", nameprefix + this.config.hiddenSuffix + namesuffix);
                    
        this.icon = jQuery("<div />").
        appendTo(this.wrapper).
        addClass("icon");
                    
        this.listWrapper = jQuery("<div />").
        appendTo(this.wrapper).
        //addClass("invisible").
        addClass("list-wrapper");
                    
        this.updateDrop();
                    
        this.list = jQuery("<ul />").appendTo(this.listWrapper);
        var self = this;
        var optWidths = [];
        this.options.each(function() {
            var optionText = jQuery.trim(jQuery(this).text());
            if (self.config.checkWidth) {
                optWidths.push(jQuery("<li />").
                    appendTo(self.list).
                    html("<span>" + optionText + "</span>").
                    addClass("visible").find("span").outerWidth());
            }
            else {
                jQuery("<li />").
                appendTo(self.list).
                html("<span>" + optionText + "</span>").
                addClass("visible");
            }
        });
                    
                    
        this.listItems = this.list.children();
                    
                    
                    
                    
        /*this.listItems.find("span").each(function() {
                    optWidths.push(jQuery(this).outerWidth());										  
                    });*/
        if (optWidths.length) {
            optWidths = optWidths.sort(function(a, b) {
                return a - b;
            });
            var maxOptionWidth = optWidths[optWidths.length - 1];
                              
                              
        }
                    
                    
        this.singleItemHeight = this.listItems.outerHeight();
        //bgiframe causes some problems, let's remove it
        /*if ("function" == typeof this.listWrapper.bgiframe) {
                    this.listWrapper.bgiframe({height: this.singleItemHeight * this.wrapper.find("li").height()});
                    }*/
        this.listWrapper.addClass("invisible");
                    
                    
        if (jQuery.browser.opera) {
            this.wrapper.css({
                position: "relative",
                left: "0",
                top: "0"
            });
        }
                    
                    
                    
        this.filterFn = ("function" == typeof(this.config.filterFn)) ? this.config.filterFn : this.filterFn;
                    
        this.lastKey = null;
        //this.overflowCSS = "overflow";
                    
        this.multiple = this.selectbox.attr("multiple");
                    
        var self = this;
                    
        this.wrapper.data("sc:lastEvent", "click");
                    
        this.overflowCSS = "overflowY";
                    
        if ((this.config.checkWidth) && (this.listWrapper.innerWidth() < maxOptionWidth)) {
            this.overflowCSS = "overflow";
                              
        }
                    
                    
        this.notify("init");
        this.initEvents();
    };
          
    //shortcuts
    var jQuerysc = jQuery.sexyCombo;
    jQuerysc.fn = jQuerysc.prototype = {};
    jQuerysc.fn.extend = jQuerysc.extend = jQuery.extend;
          
    jQuerysc.fn.extend({
        //TOC of our plugin
        //initializes all event listeners
        initEvents: function() {
            var self = this;
                              
            this.icon.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
            this.input.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
                              
            this.wrapper.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
            this.icon.bind("click", function() {
                if (self.input.attr("disabled")) {
                    self.input.attr("disabled", false);
                }
                self.wrapper.data("sc:lastEvent", "click");
                self.filter();
                self.iconClick();
            });
                              
            this.listItems.bind("mouseover", function(e) {
                //self.highlight(e.target);
                if ("LI" == e.target.nodeName.toUpperCase()) {
                    self.highlight(e.target);
                }
                else {
                    self.highlight(jQuery(e.target).parent());
                }
            });
                              
            this.listItems.bind("click", function(e) {
                self.listItemClick(jQuery(e.target));
            });
                              
            this.input.bind("keyup", function(e) {
                self.wrapper.data("sc:lastEvent", "key");							                //alert(self.wrapper.data("sc:lastEvent"));
                self.keyUp(e);
            });
                              
                              
                              
                              
                              
            this.input.bind("keypress", function(e) {
                if (jQuerysc.KEY.RETURN == e.keyCode) {
                    e.preventDefault();
                }
                if (jQuerysc.KEY.TAB == e.keyCode)
                    e.preventDefault();
            });
                              
            jQuery(document).bind("click", function(e) {
                if ((self.icon.get(0) == e.target) || (self.input.get(0) == e.target))
                    return;
                                        
                self.hideList();
            });
                              
            this.triggerSelected();
            this.applyEmptyText();
                              
                              
                              
            this.input.bind("click", function(e) {
                self.wrapper.data("sc:lastEvent", "click");
                self.icon.trigger("click");
            });
                              
                              
            //here
            this.wrapper.bind("click", function() {
                self.wrapper.data("sc:lastEvent", "click");
            });
                              
            this.input.bind("keydown", function(e) {
                if (9 == e.keyCode) {
                    e.preventDefault();
                }
            });
                              
            this.wrapper.bind("keyup", function(e) {
                var k = e.keyCode;
                for (key in jQuerysc.KEY) {
                    if (jQuerysc.KEY[key] == k) {
                        return;
                    }
                }
                self.wrapper.data("sc:lastEvent", "key");
            //jQuerysc.log("Last evt is key");
            });
                              
            this.input.bind("click", function() {
                self.wrapper.data("sc:lastEvent", "click");
            });
                              
            this.icon.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
            this.input.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
                              
            this.wrapper.bind("click", function(e) {
                if (!self.wrapper.data("sc:positionY"))	{
                    self.wrapper.data("sc:positionY", e.pageY);
                }
            });
                              
            this.notify("initEvents");
        },
                    
                    
        getTextValue: function() {
            return this.__getValue("input");
        },
                    
        getCurrentTextValue: function() {
            return this.__getCurrentValue("input");
        },
                    
        getHiddenValue: function() {
            return this.__getValue("hidden");
        },
                    
        getCurrentHiddenValue: function() {
            return this.__getCurrentValue("hidden");
        },
                    
        __getValue: function(prop) {
            prop = this[prop];
            if (!this.multiple)
                return jQuery.trim(prop.val());
                              
            var tmpVals = prop.val().split(this.config.separator);
            var vals = [];
                              
            for (var i = 0, len = tmpVals.length; i < len; ++i) {
                vals.push(jQuery.trim(tmpVals[i]));
            }
                              
            vals = jQuerysc.normalizeArray(vals);
                              
            return vals;
        },
                    
        __getCurrentValue: function(prop) {
            prop = this[prop];
            if (!this.multiple)
                return jQuery.trim(prop.val());
                              
            return jQuery.trim(prop.val().split(this.config.separator).pop());
        },
                    
        //icon click event listener
        iconClick: function() {
            if (this.listVisible()) {
                this.hideList();
                this.input.blur();
            }
            else {
                this.showList();
                this.input.focus();
                if (this.input.val().length) {
                    this.selection(this.input.get(0), 0, this.input.val().length);
                }
            }
        },
                    
        //returns true when dropdown list is visible
        listVisible: function() {
            return this.listWrapper.hasClass("visible");
        },
                    
        //shows dropdown list
        showList: function() {
            if (!this.listItems.filter(".visible").length)
                return;
                              
            this.listWrapper.removeClass("invisible").
            addClass("visible");
            this.wrapper.css("zIndex", "99999");
            this.listWrapper.css("zIndex", "99999");
            this.setListHeight();
                              
            var listHeight = this.listWrapper.height();
            var inputHeight = this.wrapper.height();
                              
            var bottomPos = parseInt(this.wrapper.data("sc:positionY")) + inputHeight + listHeight;
            var maxShown = jQuery(window).height() + jQuery(document).scrollTop();
            if (bottomPos > maxShown) {
                this.setDropUp(true);
            }
            else {
                this.setDropUp(false);
            }
                              
            if ("" == jQuery.trim(this.input.val())) {
                this.highlightFirst();
                this.listWrapper.scrollTop(0);
            }
            else {
                this.highlightSelected();
            }
            this.notify("showList");
        },
                    
        //hides dropdown list
        hideList: function() {
            if (this.listWrapper.hasClass("invisible"))
                return;
            this.listWrapper.removeClass("visible").
            addClass("invisible");
            this.wrapper.css("zIndex", "0");
            this.listWrapper.css("zIndex", "99999");
                              
            this.notify("hideList");
        },
                    
        //returns sum of all visible items height
        getListItemsHeight: function() {
                              
            var itemHeight = this.singleItemHeight;
            return itemHeight * this.liLen();
        },
                    
        //changes list wrapper's overflow from hidden to scroll and vice versa (depending on list items height))
        setOverflow: function() {
            var maxHeight = this.getListMaxHeight();
                              
            if (this.getListItemsHeight() > maxHeight)
                this.listWrapper.css(this.overflowCSS, "scroll");
            else
                this.listWrapper.css(this.overflowCSS, "hidden");
        },
                    
        //highlights active item of the dropdown list
        highlight: function(activeItem) {
            if ((jQuerysc.KEY.DOWN == this.lastKey) || (jQuerysc.KEY.UP == this.lastKey))
                return;
                              
            this.listItems.removeClass("active");
            jQuery(activeItem).addClass("active");
        },
                    
                    
                    
        //sets text and hidden inputs value
        setComboValue: function(val, pop, hideList) {
            var oldVal = this.input.val();
                              
            var v = "";
            if (this.multiple) {
                v = this.getTextValue();
                if (pop)
                    v.pop();
                v.push(jQuery.trim(val));
                v = jQuerysc.normalizeArray(v);
                v = v.join(this.config.separator) + this.config.separator;
                                        
            } else {
                v = jQuery.trim(val);
            }
            this.input.val(v);
            this.setHiddenValue(val);
            this.filter();
            if (hideList)
                this.hideList();
            this.input.removeClass("empty");
                    
                    
            if (this.multiple)
                this.input.focus();
                    
            if (this.input.val() != oldVal)
                this.notify("textChange");
                    
        },
          
          
          
        //sets hidden inputs value
        //takes text input's value as a param
        setHiddenValue: function(val) {
            var set = false;
            val = jQuery.trim(val);
            var oldVal = this.hidden.val();
                    
            if (!this.multiple) {
                for (var i = 0, len = this.options.length; i < len; ++i){
                    if (val == this.options.eq(i).text()) {
                        this.hidden.val(this.options.eq(i).val());
                        set = true;
                        break;
                    }
                }
            }
            else {
                var comboVals = this.getTextValue();
                var hiddenVals = [];
                for (var i = 0, len = comboVals.length; i < len; ++i) {
                    for (var j = 0, len1 = this.options.length; j < len1; ++j) {
                        if (comboVals[i] == this.options.eq(j).text()) {
                            hiddenVals.push(this.options.eq(j).val());
                        }
                    }
                }
                              
                if (hiddenVals.length) {
                    set = true;
                    this.hidden.val(hiddenVals.join(this.config.separator));
                }
            }
                    
            if (!set) {
                this.hidden.val(this.config.initialHiddenValue);
            }
                    
            if (oldVal != this.hidden.val())
                this.notify("change");
                    
            this.selectbox.val(this.hidden.val());
            this.selectbox.trigger("change");
        },
          
          
        listItemClick: function(item) {
            this.setComboValue(item.text(), true, true);
            this.inputFocus();
        },
          
        //adds / removes items to / from the dropdown list depending on combo's current value
        filter: function() {
            if ("yes" == this.wrapper.data("sc:optionsChanged")) {
                var self = this;
                this.listItems.remove();
                this.options = this.selectbox.children().filter("option");
                this.options.each(function() {
                    var optionText = jQuery.trim(jQuery(this).text());
                    jQuery("<li />").
                    appendTo(self.list).
                    text(optionText).
                    addClass("visible");
                                        
                });
                              
                this.listItems = this.list.children();
                              
                this.listItems.bind("mouseover", function(e) {
                    self.highlight(e.target);
                });
                              
                this.listItems.bind("click", function(e) {
                    self.listItemClick(jQuery(e.target));
                });
                              
                self.wrapper.data("sc:optionsChanged", "");
            }
                    
            var comboValue = this.input.val();
            var self = this;
                    
            this.listItems.each(function() {
                var jQuerythis = jQuery(this);
                var itemValue = jQuerythis.text();
                if (self.filterFn.call(self, self.getCurrentTextValue(), itemValue, self.getTextValue())) {
                    jQuerythis.removeClass("invisible").
                    addClass("visible");
                } else {
                    jQuerythis.removeClass("visible").
                    addClass("invisible");
                }
            });
          
            this.setOverflow();
            this.setListHeight();
        },

        //default dropdown list filtering function
        filterFn: function(currentComboValue, itemValue, allComboValues) {
            if ("click" == this.wrapper.data("sc:lastEvent")) {
                return true;
            }
            //alert(currentComboValue.toSource());
            if (!this.multiple) {
                return itemValue.toLowerCase().indexOf(currentComboValue.toLowerCase()) == 0;
            }
            else {
                //exclude values that are already selected
                    
                for (var i = 0, len = allComboValues.length; i < len; ++i) {
                    if (itemValue == allComboValues[i]) {
                        return false;
                    }
                }
                    
                return itemValue.toLowerCase().search(currentComboValue.toLowerCase()) == 0;
            }
        },

        //just returns integer value of list wrapper's max-height property
        getListMaxHeight: function() {
          
            var result = parseInt(this.listWrapper.css("maxHeight"), 10);
            if (isNaN(result)) {
                result = this.singleItemHeight * 10;
            }
          
            return result;
        },

        //corrects list wrapper's height depending on list items height
        setListHeight: function() {
          
            var liHeight = this.getListItemsHeight();
          
            var maxHeight = this.getListMaxHeight();
          
          
            var listHeight = this.listWrapper.height();
            if (liHeight < listHeight) {
                this.listWrapper.height(liHeight);
                    
                return liHeight;
            }
            else if (liHeight > listHeight) {
                this.listWrapper.height(Math.min(maxHeight, liHeight));
                    
                return Math.min(maxHeight, liHeight);
            }
          
        },

        //returns active (hovered) element of the dropdown list
        getActive: function() {
            return this.listItems.filter(".active");
        },

        keyUp: function(e) {
            this.lastKey = e.keyCode;
            var k = jQuerysc.KEY;
            switch (e.keyCode) {
                case k.RETURN:
                case k.TAB:
                    //this.input.focus();
                    this.setComboValue(this.getActive().text(), true, true);
                    if (!this.multiple)
                        this.input.blur();
                    
                    break;
                case k.DOWN:
                    this.highlightNext();
                    break;
                case k.UP:
                    this.highlightPrev();
                    break;
                case k.ESC:
                    this.hideList();
                    break;
                default:
                    this.inputChanged();
                    break;
            }
          
          
        },

        //returns number of currently visible list items
        liLen: function() {
            return this.listItems.filter(".visible").length;
        },

        //triggered when the user changes combo value by typing
        inputChanged: function() {
            this.filter();
          
            if (this.liLen()) {
                this.showList();
                this.setOverflow();
                this.setListHeight();
            } else {
                this.hideList();
            }

            this.setHiddenValue(this.input.val());
            this.notify("textChange");

        },

        //highlights first item of the dropdown list
        highlightFirst: function() {
            this.listItems.removeClass("active").filter(".visible:eq(0)").addClass("active");
            this.autoFill();
        },

        highlightSelected: function() {
            this.listItems.removeClass("active");
            var val = jQuery.trim(this.input.val());
          
            try {
                this.listItems.each(function() {
                    var jQuerythis = jQuery(this);
                    if (jQuerythis.text() == val) {
                        jQuerythis.addClass("active");
                        self.listWrapper.scrollTop(0);
                        self.scrollDown();
                                        
                    }
                });
            } catch (e) {}
        },

        //highlights item of the dropdown list next to the currently active item
        highlightNext: function() {
            var jQuerynext = this.getActive().next();
          
            while (jQuerynext.hasClass("invisible") && jQuerynext.length) {
                jQuerynext = jQuerynext.next();
            }
          
            if (jQuerynext.length) {
                this.listItems.removeClass("active");
                jQuerynext.addClass("active");
                this.scrollDown();
            }
        },

        //scrolls list wrapper down when needed
        scrollDown: function() {
            if ("scroll" != this.listWrapper.css(this.overflowCSS))
                return;
          
            var beforeActive = this.getActiveIndex() + 1;
            /*if (jQuery.browser.opera)
          ++beforeActive;*/
          
            var minScroll = this.listItems.outerHeight() * beforeActive - this.listWrapper.height();
          
            if (jQuery.browser.msie)
                minScroll += beforeActive;
          
            if (this.listWrapper.scrollTop() < minScroll)
                this.listWrapper.scrollTop(minScroll);
        },


        //highlights list item before currently active item
        highlightPrev: function() {
            var jQueryprev = this.getActive().prev();
          
            while (jQueryprev.length && jQueryprev.hasClass("invisible"))
                jQueryprev = jQueryprev.prev();
          
            if (jQueryprev.length) {
                this.getActive().removeClass("active");
                jQueryprev.addClass("active");
                this.scrollUp();
            }
        },

        //returns index of currently active list item
        getActiveIndex: function() {
            return jQuery.inArray(this.getActive().get(0), this.listItems.filter(".visible").get());
        },


        //scrolls list wrapper up when needed
        scrollUp: function() {
          
            if ("scroll" != this.listWrapper.css(this.overflowCSS))
                return;
          
            var maxScroll = this.getActiveIndex() * this.listItems.outerHeight();
          
            if (this.listWrapper.scrollTop() > maxScroll) {
                this.listWrapper.scrollTop(maxScroll);
            }
        },

        //emptyText stuff
        applyEmptyText: function() {
            if (!this.config.emptyText.length)
                return;
          
            var self = this;
            this.input.bind("focus", function() {
                self.inputFocus();
            }).
            bind("blur", function() {
                self.inputBlur();
            });
          
            if ("" == this.input.val()) {
                this.input.addClass("empty").val(this.config.emptyText);
            }
        },

        inputFocus: function() {
            if (this.input.hasClass("empty")) {
                this.input.removeClass("empty").
                val("");
            }
        },

        inputBlur: function() {
            if ("" == this.input.val()) {
                this.input.addClass("empty").
                val(this.config.emptyText);
            }
          
        },

        //triggerSelected stuff
        triggerSelected: function() {
            if (!this.config.triggerSelected)
                return;
          
            var self = this;
            try {
                this.options.each(function() {
                    if (jQuery(this).attr("selected")) {
                        self.setComboValue(jQuery(this).text(), false, true);
                        throw new Exception();
                    }
                });
            } catch (e) {
                return;
            }

            self.setComboValue(this.options.eq(0).text(), false, false);
        },

        //autofill stuff
        autoFill: function() {
            if (!this.config.autoFill || (jQuerysc.KEY.BACKSPACE == this.lastKey) || this.multiple)
                return;
          
            var curVal = this.input.val();
            var newVal = this.getActive().text();
            this.input.val(newVal);
            this.selection(this.input.get(0), curVal.length, newVal.length);
          
          
        },

        //provides selection for autofilling
        //borrowed from jCarousel
        selection: function(field, start, end) {
            if( field.createTextRange ){
                var selRange = field.createTextRange();
                selRange.collapse(true);
                selRange.moveStart("character", start);
                selRange.moveEnd("character", end);
                selRange.select();
            } else if( field.setSelectionRange ){
                field.setSelectionRange(start, end);
            } else {
                if( field.selectionStart ){
                    field.selectionStart = start;
                    field.selectionEnd = end;
                }
            }
        // field.focus();
        },


        //for internal use
        updateDrop: function() {
            if (this.config.dropUp)
                this.listWrapper.addClass("list-wrapper-up");
            else
                this.listWrapper.removeClass("list-wrapper-up");
        },

        //updates dropUp config option
        setDropUp: function(drop) {
            this.config.dropUp = drop;
            this.updateDrop();
        },

        notify: function(evt) {
            if (!jQuery.isFunction(this.config[evt + "Callback"]))
                return;
          
            this.config[evt + "Callback"].call(this);
        }
    });

    jQuerysc.extend({
        //key codes
        //from jCarousel
        KEY: {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        },
          
        //for debugging
        log: function(msg) {
            var jQuerylog = jQuery("#log");
            jQuerylog.html(jQuerylog.html() + msg + "<br />");
        },
          
        createSelectbox: function(config) {
            var jQueryselectbox = jQuery("<select />").
            appendTo(config.container).
            attr({
                name: config.name,
                id: config.id,
                size: "1"
            });
                    
            if (config.multiple)
                jQueryselectbox.attr("multiple", true);
                    
            var data = config.data;
            var selected = false;
                    
            for (var i = 0, len = data.length; i < len; ++i) {
                selected = data[i].selected || false;
                jQuery("<option />").appendTo(jQueryselectbox).
                attr("value", data[i].value).
                text(data[i].text).
                attr("selected", selected);
            }
                    
            return jQueryselectbox.get(0);
        },
          
        create: function(config) {
            var defaults = {
                //the name of the selectbox
                name: "",
                //the ID of the selectbox
                id: "",
                //data for the options
                /*
                              This is an array of objects. The objects should contain the following properties:
                              (string)value - the value of the <option>
                              (string) text - text of the <option>
                              (bool) selected - if set to true, "selected" attribute of this <option> will be set to true
                              */
                data: [],
                              
                //if true, combo with multiple choice will be created
                multiple: false,
                              
                //an element that will contain the widget
                container: jQuery(document),
                //url that contains JSON object for options data
                //format is the same as in data config option
                //if passed, "data" config option will be ignored
                url: "",
                //params for AJAX request
                ajaxData: {}
            };
            config = jQuery.extend({}, defaults, config || {});
                    
            if (config.url) {
                return jQuery.getJSON(config.url, config.ajaxData, function(data) {
                    delete config.url;
                    delete config.ajaxData;
                    config.data = data;
                    return jQuerysc.create(config);
                });
            }
                    
            config.container = jQuery(config.container);
                    
            var selectbox = jQuerysc.createSelectbox(config);
            return new jQuerysc(selectbox, config);
                    
        },
          
        deactivate: function(jQueryselect) {
            jQueryselect = jQuery(jQueryselect);
            jQueryselect.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return;
                }
                var jQuerythis = jQuery(this);
                if (!jQuerythis.parent().is(".combo")) {
                    return;
                }
            //jQuerythis.parent().find("input[type='text']").attr("disabled", true);
                              
            });
        },
          
        activate: function(jQueryselect) {
            jQueryselect = jQuery(jQueryselect);
            jQueryselect.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return;
                }
                var jQuerythis = jQuery(this);
                if (!jQuerythis.parent().is(".combo")) {
                    return;
                }
                jQuerythis.parent().find("input[type='text']").attr("disabled", false);
            });
        },
          
        changeOptions: function(jQueryselect) {
            jQueryselect = jQuery(jQueryselect);
            jQueryselect.each(function() {
                if ("SELECT" != this.tagName.toUpperCase()) {
                    return;
                }
                              
                var jQuerythis = jQuery(this);
                var jQuerywrapper  = jQuerythis.parent();
                var jQueryinput = jQuerywrapper.find("input[type='text']");
                var jQuerylistWrapper = jQuerywrapper.find("ul").parent();
                              
                jQuerylistWrapper.removeClass("visible").
                addClass("invisible");
                jQuerywrapper.css("zIndex", "0");
                jQuerylistWrapper.css("zIndex", "99999");
                              
                jQueryinput.val("");
                jQuerywrapper.data("sc:optionsChanged", "yes");
                var jQueryselectbox = jQuerythis;
                jQueryselectbox.parent().find("input[type='text']").val(jQueryselectbox.find("option:eq(0)").text());
                jQueryselectbox.parent().data("sc:lastEvent", "click");
                jQueryselectbox.find("option:eq(0)").attr('selected','selected');
            });
        },
          
        normalizeArray: function(arr) {
            var result = [];
            for (var i = 0, len =arr.length; i < len; ++i) {
                if ("" == arr[i])
                    continue;
                              
                result.push(arr[i]);
            }
                    
            return result;
        }
    });
})(jQuery); 


jQuery.noConflict();
jQuery(function() {             
    if(jQuery("#empty-combo")){
        jQuery("#empty-combo").sexyCombo({
            emptyText: "Choose a Timezone..."
        });
    }         
});