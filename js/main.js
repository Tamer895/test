
function DeleteSavedListing(id)
{
	var saved_listings = r_cookie("saved_listings");
	
	if(saved_listings.indexOf(id+",") != -1)
	{
		saved_listings=saved_listings.replace(id+",","");
		
		document.cookie="saved_listings="+saved_listings;
		
		$("#save_"+id).removeAttr("href");
		$("#save_"+id).removeClass('btn-default').addClass('btn-info');
		$("#save_"+id).text("Deleted"); 
	}
}

function SaveListing(id)
{
	var saved_listings = r_cookie("saved_listings");
	
	if(saved_listings.indexOf(id+",") != -1)
	{
		
	}
	else
	{
		
		saved_listings+=id+",";
		document.cookie="saved_listings="+saved_listings;
		
		$("#save_"+id).attr("href", "index.php?mod=saved")
		$("#save_"+id).text("Saved"); 
	}
}

function r_cookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}

function sub_loc_select(x)
{
	
	if(x=="") return;
	
	
	
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			show_sub_locs(xmlhttp.responseText,x);
		}
	}
	if(typeof loc_type !== 'undefined' && loc_type=="admin")
	{
		xmlhttp.open("GET","../include/suggest_location.php?location="+x+"&q=",true);
	}
	else
	{
		xmlhttp.open("GET","include/suggest_location.php?location="+x+"&q=",true);
	}
	xmlhttp.send(null);
	
}
var up_html = new Array();
var i_last_level = -1;
function show_sub_locs(text,x)
{
	var i_level = (x.split(".").length - 1);

	for(i=i_level;i<=4;i++)
	{
		document.getElementById("sub_locations"+i).innerHTML="";	
	}
	
	var new_html="";
	var splitArray = text.split("~");

	var j = 0;
	for(j = 0; j < splitArray.length; j++)
	{
		var location = splitArray[j].split("#");
		 
		if(location[0]=="no suggestion")
		{
			
			
		}
		else
		{
			new_html += "<option value=\""+location[1]+"\">"+location[0]+"</option>";
		}
	}
	
	if(new_html!="")
	{
		new_html ='<select onChange="sub_loc_select(this.value)" type="text" class="form-control input-sm" id="location'+i_level+'" name="location'+i_level+'">'
		+'<option value="">'+(typeof m_all !== 'undefined'?m_all:"All")+'</option>'+new_html+'</select>';
		document.getElementById("sub_locations"+i_level).innerHTML=new_html;
	}
	
	i_last_level = i_level
}	

function GoBack()
{
	history.back();
}

function ShowHide(div_name)
{

	if(document.getElementById(div_name).style.display=="block")
	{
		document.getElementById(div_name).style.display="none";
	}
	else
	{
		document.getElementById(div_name).style.display="block";
	}

}




function locations_select(x,field_name,suggest_url)
{
	if(x=="") return;
	
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			show_locations(xmlhttp.responseText,x,field_name,suggest_url);
		}
	}
	
	if(suggest_url.indexOf("lang=") !=-1)
	{
		xmlhttp.open("GET",suggest_url+"&location="+x+"&q=",true);
	}
	else
	{
		xmlhttp.open("GET",suggest_url+"?location="+x+"&q=",true);
	}	
	xmlhttp.send(null);
	
	
}


var up_html = new Array();
var i_last_level = -1;
function show_locations(text,x,field_name,suggest_url)
{
	var i_level = (x.split(".").length - 1);

	for(i=i_level;i<=4;i++)
	{
		document.getElementById("s_"+field_name+"_"+i).innerHTML="";	
	}
	
	var new_html="";
	var splitArray = text.split("~");

	var j = 0;
	for(j = 0; j < splitArray.length; j++)
	{
		var location = splitArray[j].split("#");
		 
		if(location[0]=="no suggestion")
		{
			
			
		}
		else
		{
			new_html += "<option value=\""+location[1]+"\">"+location[0]+"</option>";
		}
	}
	
	if(new_html!="")
	{
		new_html =''+level_prefix+'<select required '+(field_name=="category_1"?'required':'')+' onChange="locations_select(this.value,\''+field_name+'\',\''+suggest_url+'\')" type="text" class="'+level_class+'" id="'+field_name+'_'+(i_level+1)+'" name="'+field_name+'_'+(i_level+1)+'">'
		+'<option value="">'+m_all+'</option>'+new_html+'</select>';
		document.getElementById("s_"+field_name+"_"+i_level).innerHTML=new_html;
	}
	
	i_last_level = i_level
}	


var is_advanced=false;
function AdvancedSearch()
{
	if(!is_advanced)
	{
		
		//document.getElementById("extra_fields").style.display="block";
		
		document.getElementById("expand_search_img").src = document.getElementById("expand_search_img").src.replace("_o", "_c");
		document.getElementById("more_button").innerHTML=less_text;
		is_advanced=true;
	}
	else
	{

		//document.getElementById("extra_fields").style.display="none";
		document.getElementById("expand_search_img").src = document.getElementById("expand_search_img").src.replace("_c", "_o");
		document.getElementById("more_button").innerHTML=more_text;
		
		is_advanced=false;
	}
}


function number_format (number, decimals, dec_point, thousands_sep) {
   
   number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
   
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}


var AnimationStep = 25; 
var AnimationInterval = 10; 
var LoginHeight = 240;
var c_step=0;

function ShowLogin() 
{
	var oDiv = document.getElementById("main-login-form");
		
	if (c_step < (LoginHeight / AnimationInterval))
	{
		oDiv.style.display = "block";
	 
		Animate(oDiv);
	}
	else
	{
		HideAnimate(oDiv);
	}
}

function HideLogin() 
{
	
	var oDiv = document.getElementById("main-login-form");
	HideAnimate(oDiv);
}

function HideAnimate(element) 
{
   
    if (c_step <= 0)
	{
		element.style.display = "none";
		return true;
	}
        
	
	c_step--;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        HideAnimate(element);
    }, AnimationInterval);
    return false;
}


function Animate(element) 
{
   
    if (c_step >= (LoginHeight / AnimationInterval))
        return true;
	
	c_step++;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        Animate(element);
    }, AnimationInterval);
    return false;
}

$('.carousel').bcSwipe({ threshold: 50 });
$('.carousel').carousel({
  interval: false
});

function ScrollToTop()
{
	window.scrollTo(0, 0);
}
var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),
    $html = $('html'),
    isIE = (userAgent.indexOf('msie') != -1) ? parseInt(userAgent.split('msie')[1], 10) : false,
    isDesktop = $html.hasClass('desktop'),
    isIEBrows = navigator.appVersion.indexOf("MSIE") != -1 || navigator.appVersion.indexOf('Trident/') > 0,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window,
    plugins = {
        owl: $('.owl-carousel'),
        swiper: $(".swiper-slider"),

        gallery: $('.swiper-container'),

        slick: $('.carousel-slider')
    },
    $year = $("#copyright-year"),

    $document = $(document),
    i = 0;
$document.ready(function() {
	
if(document.getElementById("map"))			
{		
	show_map();		
}

if(document.getElementById("slider_section"))	
{
	
	
    function getSwiperHeight(object, attr) {
        var val = object.attr("data-" + attr),
            dim;
        if (!val) {
            return undefined;
        }
        dim = val.match(/(px)|(%)|(vh)$/i);
        if (dim.length) {
            switch (dim[0]) {
                case "px":
                    return parseFloat(val);
                case "vh":
                    return $(window).height() * (parseFloat(val) / 100);
                case "%":
                    return object.width() * (parseFloat(val) / 100);
            }
        } else {
            return undefined;
        }
    }

    function toggleSwiperCaptionAnimation(swiper) {
        var prevSlide = $(swiper.container),
            nextSlide = $(swiper.slides[swiper.activeIndex]),
            prevAnimations = prevSlide.find("[data-caption-animate]"),
            nextAnimations = nextSlide.find("[data-caption-animate]");
        for (i = 0; i < prevAnimations.length; i++) {
            var prevAnimationItem = $(prevAnimations[i]);
            prevAnimationItem.removeClass("animated").removeClass(prevAnimationItem.attr("data-caption-animate")).addClass("not-animated");
        }
        for (i = 0; i < nextAnimations.length; i++) {
            var nextAnimationItem = $(nextAnimations[i]),
                delay = nextAnimationItem.attr("data-caption-delay");
            setTimeout((function() {
                nextAnimationItem.removeClass("not-animated").addClass(nextAnimationItem.attr("data-caption-animate")).addClass("animated");
            })(nextAnimationItem), delay ? parseInt(delay) : 0);
        }
    }

    function preventScroll(e) {
        e.preventDefault();
    }

    function isScrolledIntoView(elem) {
        var $window = $(window);
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
    }

    function getIeVersion() {
        var myNav = navigator.userAgent.toLowerCase(),
            msie = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        if (!msie) {
            return (myNav.indexOf('trident') != -1) ? 11 : ((myNav.indexOf('edge') != -1) ? 12 : false);
        }
        return msie;
    }
    var ieVersion = getIeVersion();

    if (ieVersion) {
        if (ieVersion === 12) {
            $('html').addClass('ie-edge');
        }
        if (ieVersion === 11) {
            $('html').addClass('ie-11');
        }
        if (ieVersion && ieVersion < 11) {
            $('html').addClass('lt-ie11');
            $(document).ready(function() {});
        }
        if (ieVersion && ieVersion < 10) {
            $('html').addClass('lt-ie10');
        }
    }

    if ($.length) {
        $.RDToggles();
    }

    if (plugins.swiper.length) {
        for (i = 0; i < plugins.swiper.length; i++) {
            var s = $(plugins.swiper[i]);
            var pag = s.find(".swiper-pagination"),
                next = s.find(".swiper-button-next"),
                prev = s.find(".swiper-button-prev"),
                bar = s.find(".swiper-scrollbar"),
                parallax = s.parents('.rd-parallax').length,
                swiperSlide = s.find(".swiper-slide");
            for (j = 0; j < swiperSlide.length; j++) {
                var $this = $(swiperSlide[j]),
                    url;
                if (url = $this.attr("data-slide-bg")) {
                    $this.css({
                        "background-image": "url(" + url + ")",
                        "background-size": "cover"
                    })
                }
            }
            swiperSlide.end().find("[data-caption-animate]").addClass("not-animated").end().swiper({
                autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : animation_speed,
                direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
                effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
                speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
                keyboardControl: s.attr('data-keyboard') === "true",
                mousewheelControl: s.attr('data-mousewheel') === "true",
                mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
                nextButton: next.length ? next.get(0) : null,
                prevButton: prev.length ? prev.get(0) : null,
                pagination: pag.length ? pag.get(0) : null,
                paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
                paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function(index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                } : null : null,
                scrollbar: bar.length ? bar.get(0) : null,
                scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
                scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
                loop: s.attr('data-loop') !== "false",
                onTransitionStart: function(swiper) {},
                onTransitionEnd: function(swiper) {
                    toggleSwiperCaptionAnimation(swiper);
                },
                onInit: function(swiper) {
                    toggleSwiperCaptionAnimation(swiper);
                    var swiperParalax = s.find(".swiper-parallax");
                    for (var k = 0; k < swiperParalax.length; k++) {
                        var $this = $(swiperParalax[k]),
                            speed;
                        if (parallax && !isIEBrows && !isMobile) {
                            if (speed = $this.attr("data-speed")) {}
                        }
                    }

                    $(window).on('resize', function() {
                        swiper.update(true);
                    })
                }
            });
            $(window).on("resize", function() {
                var mh = getSwiperHeight(s, "min-height"),
                    h = getSwiperHeight(s, "height");
                if (h) {
                    s.css("height", mh ? mh > h ? mh : h : h);
                }
            }).trigger("resize");
        }
    }

    if (plugins.owl.length) {
        for (i = 0; i < plugins.owl.length; i++) {
            var c = $(plugins.owl[i]),
                responsive = {};
            var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
                values = [0, 480, 768, 992, 1200],
                j, k;
            for (j = 0; j < values.length; j++) {
                responsive[values[j]] = {};
                for (k = j; k >= -1; k--) {
                    if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
                        responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"));
                    }
                    if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
                        responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"));
                    }
                    if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
                        responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"));
                    }
                }
            }
            c.owlCarousel({
                autoplay: c.attr("data-autoplay") === "true",
                loop: c.attr("data-loop") !== "false",
                items: 1,
                dotsContainer: c.attr("data-pagination-class") || false,
                navContainer: c.attr("data-navigation-class") || false,
                mouseDrag: c.attr("data-mouse-drag") !== "false",
                nav: c.attr("data-nav") === "true",
                dots: c.attr("data-dots") === "true",
                dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
                responsive: responsive,
                navText: [],
                onInitialized: function() {
                    if ($.fn.magnificPopup) {
                        var o = this.$element.attr('data-lightbox') !== undefined && this.$element.attr("data-lightbox") !== "gallery",

                            g = this.$element.attr('data-lightbox') === "gallery";

                    }
                    if (c.attr("data-active")) {
                        c.trigger("to.owl.carousel", c.attr("data-active") - 1);
                    }
                }
            });
        }
    }
	/*
    if (plugins.slick.length) {
        for (i = 0; i < plugins.slick.length; i++) {
            $('.carousel-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                infinite: false,
                asNavFor: '.carousel-thumbnail'
            });
            $('.carousel-thumbnail').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.carousel-slider',
                dots: false,
                infinite: false,
                focusOnSelect: true,
                arrows: true,
                swipe: false,
                responsive: [{
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3
                    }
                }]
            });
        }
    }
	*/

}

if(document.getElementById("mulitplefileuploader"))
{
	var uploadObj = $("#mulitplefileuploader").uploadFile(settings);
}
	
});