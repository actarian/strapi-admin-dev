"use strict";(self.webpackChunktest_strapi=self.webpackChunktest_strapi||[]).push([[3948],{7611:e=>{e.exports=JSON.parse('{"attribute.boolean":"Typ logiczny","attribute.boolean.description":"Tak lub nie, 1 lub 0, true lub false","attribute.component":"Komponent","attribute.component.description":"Grupa p\xf3l, kt\xf3re mo\u017cna powtarza\u0107 lub u\u017cywa\u0107 ponownie","attribute.date":"Data","attribute.date.description":"Wyb\xf3r daty z godzinami, minutami i sekundami","attribute.datetime":"Data i godzina","attribute.dynamiczone":"Strefa dynamiczna","attribute.dynamiczone.description":"Dynamicznie wybierz komponent podczas edycji tre\u015bci","attribute.email":"Email","attribute.email.description":"Pole email ze sprawdzaniem poprawno","attribute.enumeration":"Wyliczenie","attribute.enumeration.description":"Lista warto\u015bci do jednokrotnego wyboru","attribute.json":"JSON","attribute.json.description":"Dane w formacie JSON","attribute.media":"Media","attribute.media.description":"Pliki jak obrazki, filmy, itp.","attribute.null":" ","attribute.number":"Numer","attribute.number.description":"Numery (liczba ca\u0142kowita, liczba zmiennoprzecinkowa, dziesi\u0119tna)","attribute.password":"Has\u0142o","attribute.password.description":"Pole has\u0142a z szyfrowaniem","attribute.relation":"Relacja","attribute.relation.description":"Odno\u015bnik do innego modelu","attribute.richtext":"Tekst sformatowany","attribute.richtext.description":"Edytor tekstu z mo\u017cliwo\u015bci\u0105 formatowania","attribute.text":"Tekst","attribute.text.description":"Kr\xf3tki lub d\u0142ugi tekst jak tytu\u0142 lub opis","attribute.time":"Czas","attribute.uid":"UID","attribute.uid.description":"Unikalny identyfikator","button.attributes.add.another":"Dodaj kolejne pole","button.component.add":"Dodaj komponent","button.component.create":"Utw\xf3rz komponent","button.model.create":"Utw\xf3rz nowy typ zawarto\u015bci","component.repeatable":"(powtarzalne)","components.componentSelect.no-component-available":"Doda\u0142e\u015b ju\u017c wszystkie swoje komponenty","components.componentSelect.no-component-available.with-search":"Brak element\xf3w pasuj\u0105cych do Twojego wyszukiwania","components.componentSelect.value-component":"{number} wybrany komponent (wpisz, aby wyszuka\u0107 komponent)","components.componentSelect.value-components":"{number} wybranych komponent\xf3w","configurations":"konfiguracje","contentType.collectionName.description":"Przydatne, gdy nazwa typu zawarto\u015bci i nazwa tabeli r\xf3\u017cni\u0105 si\u0119","contentType.collectionName.label":"Nazwa kolekcji","contentType.displayName.label":"Wy\u015bwietlana nazwa","error.contentTypeName.reserved-name":"Ta nazwa nie mo\u017ce by\u0107 u\u017cywana w Twoim projekcie, poniewa\u017c mo\u017ce uszkodzi\u0107 inne funkcje","error.validation.minSupMax":"Nie mo\u017ce by\u0107 wy\u017cszy","form.attribute.component.option.add":"Dodaj komponent","form.attribute.component.option.create":"Utw\xf3rz nowy komponent","form.attribute.component.option.create.description":"Komponent jest wsp\xf3\u0142u\u017cytkowany przez typy i komponenty, b\u0119dzie dost\u0119pny i dost\u0119pny wsz\u0119dzie.","form.attribute.component.option.repeatable":"Powtarzalny komponent","form.attribute.component.option.repeatable.description":"Najlepsze dla wielu wyst\u0105pie\u0144 (tablicy) np. sk\u0142adnik\xf3w, metatag\xf3w itp.","form.attribute.component.option.reuse-existing":"U\u017cyj istniej\u0105cego komponentu","form.attribute.component.option.reuse-existing.description":"Ponownie u\u017cyj utworzonego ju\u017c komponentu, aby zachowa\u0107 sp\xf3jno\u015b\u0107 danych mi\u0119dzy typami tre\u015bci.","form.attribute.component.option.single":"Pojedynczy komponent","form.attribute.component.option.single.description":"Najlepsze do grupowania p\xf3l takich jak pe\u0142ny adres, g\u0142\xf3wne informacje itp.","form.attribute.item.customColumnName":"W\u0142asne nazwy tabel","form.attribute.item.customColumnName.description":"Jest to przydatne do zmiany nazwy tabel bazy danych w bardziej wszechstronnym formacie odpowiedzi API","form.attribute.item.defineRelation.fieldName":"Atrybut","form.attribute.item.enumeration.graphql":"Nadpisanie nazwy dla GraphQL","form.attribute.item.enumeration.graphql.description":"Pozwalaj na nadpisanie domy\u015blnie wygenerowanej nazwy dla GraphQL.","form.attribute.item.enumeration.placeholder":"Przyk\u0142ad:\\nrano\\npo\u0142udnie\\nwiecz\xf3r","form.attribute.item.enumeration.rules":"Values (one line per value)","form.attribute.item.maximum":"Maksymalna warto\u015b\u0107","form.attribute.item.maximumLength":"Maksymalna d\u0142ugo\u015b\u0107","form.attribute.item.minimum":"Minimalna warto\u015b\u0107","form.attribute.item.minimumLength":"Minimalna d\u0142ugo\u015b\u0107","form.attribute.item.number.type":"Forma","form.attribute.item.number.type.biginteger":"du\u017ca liczba ca\u0142kowita (np. 123456789)","form.attribute.item.number.type.decimal":"dziesi\u0119tna (np: 2.22)","form.attribute.item.number.type.float":"zmiennoprzecinkowa (np: 3.33333333)","form.attribute.item.number.type.integer":"ca\u0142kowita (np: 10)","form.attribute.item.privateField":"Pole prywatne","form.attribute.item.privateField.description":"To pole nie pojawi si\u0119 w odpowiedzi interfejsu API","form.attribute.item.requiredField":"Wymagany","form.attribute.item.requiredField.description":"Nie b\u0119dziesz w stanie stworzy\u0107 wpisu je\u017celi atrybut b\u0119dzie pusty","form.attribute.item.uniqueField":"Unikalny","form.attribute.item.uniqueField.description":"Nie b\u0119dziesz w stanie stworzy\u0107 wpisu je\u017celi warto\u015b\u0107 atrybutu b\u0119dzie ju\u017c wykorzystywana","form.attribute.media.option.multiple":"Wiele medi\xf3w","form.attribute.media.option.multiple.description":"Najlepsze dla suwak\xf3w, karuzeli lub pobierania wielu plik\xf3w","form.attribute.media.option.single":"Pojedyncze media","form.attribute.media.option.single.description":"Najlepsze dla awatara, zdj\u0119cia profilowego lub ok\u0142adki","form.attribute.settings.default":"Domy\u015blnie","form.attribute.text.option.long-text":"D\u0142ugi tekst","form.attribute.text.option.long-text.description":"Najlepsze dla opis\xf3w, biografii. \\u2028Dok\u0142adne wyszukiwanie jest wy\u0142\u0105czone.","form.attribute.text.option.short-text":"Kr\xf3tki tekst","form.attribute.text.option.short-text.description":"Najlepsze dla tytu\u0142\xf3w, nazw, link\xf3w (URL). Umo\u017cliwia tak\u017ce dok\u0142adne wyszukiwanie dla pola.","form.button.add-components-to-dynamiczone":"Dodaj komponenty do strefy","form.button.add-field":"Dodaj kolejne pole","form.button.add-first-field-to-created-component":"Dodaj pierwsze pole do komponentu","form.button.add.field.to.component":"Dodaj kolejne pole do tego komponentu","form.button.cancel":"Anuluj","form.button.configure-component":"Skonfiguruj komponent","form.button.configure-view":"Skonfiguruj widok","form.button.select-component":"Wybierz komponent","from":"z","modalForm.attribute.form.base.name.description":"Spacja nie jest dozwolona dla nazwy atrybutu","modalForm.attributes.select-component":"Wybierz komponent","modalForm.attributes.select-components":"Wybierz komponenty","modalForm.component.header-create":"Utw\xf3rz komponent","modalForm.components.create-component.category.label":"Wybierz kategori\u0119 lub wprowad\u017a nazw\u0119, aby utworzy\u0107 now\u0105","modalForm.components.icon.label":"Ikona","modalForm.editCategory.base.name.description":"Spacja nie jest dozwolona dla nazwy kategorii","modalForm.header-edit":"Edytuj {name}","modalForm.header.categories":"Kategorie","modalForm.sub-header.addComponentToDynamicZone":"Dodaj nowy komponent do strefy dynamicznej","modalForm.sub-header.attribute.create":"Dodaj nowe pole {type}","modalForm.sub-header.attribute.create.step":"Dodaj nowy komponent ({step}/2)","modalForm.sub-header.attribute.edit":"Edytuj {name}","modalForm.sub-header.chooseAttribute.collectionType":"Wybierz pole dla typu zawarto\u015bci","modalForm.sub-header.chooseAttribute.component":"Wybierz pole dla komponentu","modelPage.attribute.relationWith":"Relacja z","notification.info.creating.notSaved":"Zapisz swoj\u0105 prac\u0119 przed utworzeniem nowego typu tre\u015bci lub komponentu","plugin.description.long":"Modeluj struktur\u0119 danych swojego API. Tw\xf3rz atrybuty i relacje w minut\u0119. Pliki s\u0105 automatycznie tworzone i aktualizowane w twoim projekcie.","plugin.description.short":"Modeluj struktur\u0119 danych swojego API.","popUpForm.navContainer.advanced":"Zaawansowane","popUpForm.navContainer.base":"Podstawowe","popUpWarning.bodyMessage.cancel-modifications":"Czy na pewno chcesz anulowa\u0107 swoje modyfikacje?","popUpWarning.bodyMessage.cancel-modifications.with-components":"Czy na pewno chcesz anulowa\u0107 swoje modyfikacje? Niekt\xf3re komponenty zosta\u0142y utworzone lub zmodyfikowane ...","popUpWarning.bodyMessage.category.delete":"Czy na pewno chcesz usun\u0105\u0107 t\u0119 kategori\u0119? Wszystkie komponenty r\xf3wnie\u017c zostan\u0105 usuni\u0119te.","popUpWarning.bodyMessage.component.delete":"Czy na pewno chcesz usun\u0105\u0107 ten komponent?","popUpWarning.bodyMessage.contentType.delete":"Czy na pewno chcesz usun\u0105\u0107 ten model?","prompt.unsaved":"Jeste\u015b pewny, \u017ce chcesz wyj\u015b\u0107? Wszystkie twoje modyfikacje zostan\u0105 utracone.","relation.attributeName.placeholder":"Np: autor, kategoria, tag","relation.manyToMany":"zawiera i nale\u017cy do wielu","relation.manyToOne":"zawiera wiele","relation.manyWay":"ma wiele","relation.oneToMany":"nale\u017cy do wielu","relation.oneToOne":"zawiera i nale\u017cy do","relation.oneWay":"zawiera"}')}}]);