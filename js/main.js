$(document).ready(function() {
    var data = {
        "categories": [
            {
                "id": 1,
                "name": "Aesthetic & Anti-Aging",
                "subcategories": [
                    { "id": 101, "name": "Doctor Consultation" },
                    {
                        "id": 102,
                        "name": "Injection",
                        "subcategories": [
                            { "id": 201, "name": "Dermal Filler Injections" },
                            { "id": 202, "name": "Botulinum Toxin" },
                            {  "id": 203, "name": "Fat Burner Injection",},
                            { "id": 204, "name": "Mesotheraphy" },
                            { "id": 205, "name": "PRP",
                                "subcategories": [
                                    { "id": 301, "name": "PRP Hair" },
                                    { "id": 302, "name": "PRP Face & Neck" },
                                ]
                             }
                        ]
                    },
                    { "id": 103, "name": "Devices" },
                    { "id": 104, "name": "Skin Treatment" },
                    { "id": 105, "name": "IV Drips" }
                ]
            },
            { "id": 2, "name": "Hardware Cosmetology",
                "subcategories": [
                    { "id": 401, "name": "Doctor Consultation" },
                    { "id": 402, "name": "Laser Hair Removal" },
                    {
                        "id": 403,
                        "name": "Skin treatment (acne, pigmentation, stretch marks)",
                        "subcategories": [
                            { "id": 501, "name": "Skin Care & Facial" },
                            { "id": 502, "name": "Peeling" },
                            { "id": 503, "name": "Devices",
                                "subcategories": [
                                    { "id": 601, "name": "Sofwave" },
                                    { "id": 602, "name": "Genius RF Microneedling" },
                                    { "id": 603, "name": "Hollywood Spectra" },
                                    { "id": 604, "name": "Clarity 2" },

                                ]
                             }
                        ]
                    },
                    { "id": 404, "name": "PRP" },
                    { "id": 405, "name": "IV Drips" },
                 ]
             },
            { "id": 3, "name": "Plastic Surgery" },
            { "id": 4, "name": "Dental" },
            { "id": 5, "name": "Hair Transplant" },
            { "id": 6, "name": "Dental" }
            
        ]
    };

    getID(data.categories);

// Get First Step Categories
    function getID(categories) {
        var $container = $('.ParentRelative').empty();
        categories.forEach(function(category) {
            var hasSubcategories = category.subcategories?.length;
            $container.append(`
                <div class="MenuLabel SpaceBetCenter FlexRow ${hasSubcategories ? 'category' : 'category no-subcategories'}" data-id="${category.id}">
                    <div class="ArrowFlex"><div>${category.name}</div>
                    <svg width="9" height="14" class="arrow" style="display:none" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L7 7L0.999999 1" stroke="#000000" stroke-width="2"/></svg></div>
                </div>`);
        });
    }
    

 // Clicks on categories
$(document).on("click", '.category', function(event) { 
        var $category = $(this);
        $category.siblings('.category').css('color', '#0101144D').removeClass('active-category');
        var id = $category.data('id');
        var category = findCategoryById(data.categories, id);
        // clicked category to black and set as active
        $category.css('color', 'black').addClass('active-category');
        
        var $arrowParent = $category.parent().find('.arrow');
        
        if (category && Array.isArray(category.subcategories) && category.subcategories.length > 0) {
            
            var $arrow = $category.find('.arrow');
            
            $arrowParent.hide();
            
            if(!$category.find('.ChildSecond').length){
                $category.find('.arrow').addClass('rotate-270');
                $category.parent().find('.ChildSecond').remove();
            }
            
            toggleSubcategories($category, category.subcategories);
            $arrow.toggle();      
           
        } else {
            
            $category.find('.arrow').removeClass('rotate-270');
            $category.parent().find('.ChildSecond').remove();
            $arrowParent.hide();
            $category.find('.arrow').hide();
            
        }
        
        $category.parent().toggleClass('MenuBG');
        var element = $('.ParentRelative .MenuLabel.active-category').children('.ChildSecond');
        var isDisplayedBlock = element.is(':visible');

        // background category
        if (!$(this).hasClass("no-subcategories") && isDisplayedBlock) {
            $category.parent().removeClass('MenuBG');
        }else{
            $category.parent().addClass('MenuBG');
        }

        // Left image when hide
        $('.ParentRelative > .MenuLabel.active-category').each(function() {
            if (isDisplayedBlock) {
                $('.MainImg').css('visibility', 'hidden');
            }else{
                 $('.MainImg').css('visibility', 'visible');
            }
            
        });
        event.stopPropagation();
    });
});

// arrow rotate
$(document).on("click", '.ArrowFlex', function(event) { 
    $(this).find('.arrow').toggleClass('rotate-270');
});


// Function to toggle visibility of subcategories
function toggleSubcategories($category, subcategories) {
    var $childContainer = $category.find('.ChildSecond');
    if (!$childContainer.length) {
        $category.append('<div class="ChildSecond MenuBG"></div>')
                 .find('.ChildSecond').append(
            subcategories.map(subcategory => `
                <div class="${subcategory.subcategories?.length ? 'category' : 'category no-subcategories'}" data-id="${subcategory.id}">
                    <div class="ArrowFlex"><div>${subcategory.name}</div>
                    ${subcategory.subcategories?.length ? '<svg width="9" height="14" class="arrow" style="display:none" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L7 7L0.999999 1" stroke="#000000" stroke-width="2"/></svg>' : ''}
                </div></div>`).join('')).show();
    } else {
        $childContainer.toggle();
    }
}


// Function to find a category and subcategories by ID
function findCategoryById(categories, id) {
    for (let category of categories) {
        if (category.id === id) return category;
        let found = findCategoryById(category.subcategories || [], id);
        if (found) return found;
    }
    return null;
}


