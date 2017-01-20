import * as fetch from 'node-fetch';

let fetchMethod = require('node-fetch');

export class Client {
    private baseUrl: string; 
    private http: { fetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> };
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> }) {
        this.baseUrl = baseUrl ? baseUrl : "";
        this.http = {
            fetch: (url: fetch.RequestInfo, init?: fetch.RequestInit) => {
                return fetchMethod(url, init);
            }
        };
    }

    /**
     * List all alliances
     * @datasource The server name you would like data from
     * @return List of Alliance IDs
     */
    get_alliances(datasource: Datasource): Promise<number[]> {
        let url_ = this.baseUrl + "/alliances?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        console.log(url_);
        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_alliances(response);
        });
    }

    private processGet_alliances(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: number[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(item);
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception.fromJS(resultData500) : new Exception();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get alliance names
     * @alliance_ids A comma separated list of alliance IDs
     * @datasource The server name you would like data from
     * @return List of id/name associations
     */
    get_alliances_names(alliance_ids: number[], datasource: Datasource2): Promise<Response[]> {
        let url_ = this.baseUrl + "/alliances/names?"; 
        if (alliance_ids === undefined || alliance_ids === null)
            throw new Error("The parameter 'alliance_ids' must be defined and cannot be null.");
        else
            alliance_ids.forEach(item => { url_ += "alliance_ids=" + encodeURIComponent("" + item) + "&"; });
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_alliances_names(response);
        });
    }

    private processGet_alliances_names(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception2 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception2.fromJS(resultData500) : new Exception2();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get alliance information
     * @alliance_id An Eve alliance ID
     * @datasource The server name you would like data from
     * @return Public data about an alliance
     */
    get_alliances_alliance_id(alliance_id: number, datasource: Datasource3): Promise<Response2> {
        let url_ = this.baseUrl + "/alliances/{alliance_id}?"; 
        if (alliance_id === undefined || alliance_id === null)
            throw new Error("The parameter 'alliance_id' must be defined.");
        url_ = url_.replace("{alliance_id}", encodeURIComponent("" + alliance_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_alliances_alliance_id(response);
        });
    }

    private processGet_alliances_alliance_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response2 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response2.fromJS(resultData200) : new Response2();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception3 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception3.fromJS(resultData404) : new Exception3();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception4 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception4.fromJS(resultData500) : new Exception4();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List alliance's corporations
     * @alliance_id An EVE alliance ID
     * @datasource The server name you would like data from
     * @return List of corporation IDs
     */
    get_alliances_alliance_id_corporations(alliance_id: number, datasource: Datasource4): Promise<number[]> {
        let url_ = this.baseUrl + "/alliances/{alliance_id}/corporations?"; 
        if (alliance_id === undefined || alliance_id === null)
            throw new Error("The parameter 'alliance_id' must be defined.");
        url_ = url_.replace("{alliance_id}", encodeURIComponent("" + alliance_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_alliances_alliance_id_corporations(response);
        });
    }

    private processGet_alliances_alliance_id_corporations(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: number[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(item);
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception5 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception5.fromJS(resultData500) : new Exception5();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get alliance icon
     * @alliance_id An EVE alliance ID
     * @datasource The server name you would like data from
     * @return Urls for icons for the given alliance id and server
     */
    get_alliances_alliance_id_icons(alliance_id: number, datasource: Datasource5): Promise<Response3> {
        let url_ = this.baseUrl + "/alliances/{alliance_id}/icons?"; 
        if (alliance_id === undefined || alliance_id === null)
            throw new Error("The parameter 'alliance_id' must be defined.");
        url_ = url_.replace("{alliance_id}", encodeURIComponent("" + alliance_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_alliances_alliance_id_icons(response);
        });
    }

    private processGet_alliances_alliance_id_icons(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response3 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response3.fromJS(resultData200) : new Response3();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception6 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception6.fromJS(resultData404) : new Exception6();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception7 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception7.fromJS(resultData500) : new Exception7();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character names
     * @character_ids A comma separated list of character IDs
     * @datasource The server name you would like data from
     * @return List of id/name associations
     */
    get_characters_names(character_ids: number[], datasource: Datasource6): Promise<Response4[]> {
        let url_ = this.baseUrl + "/characters/names?"; 
        if (character_ids === undefined || character_ids === null)
            throw new Error("The parameter 'character_ids' must be defined and cannot be null.");
        else
            character_ids.forEach(item => { url_ += "character_ids=" + encodeURIComponent("" + item) + "&"; });
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_names(response);
        });
    }

    private processGet_characters_names(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response4[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response4.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception8 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception8.fromJS(resultData500) : new Exception8();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character's public information
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Public data for the given character
     */
    get_characters_character_id(character_id: number, datasource: Datasource7): Promise<Response5> {
        let url_ = this.baseUrl + "/characters/{character_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id(response);
        });
    }

    private processGet_characters_character_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response5 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response5.fromJS(resultData200) : new Response5();
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception9 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception9.fromJS(resultData422) : new Exception9();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception10 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception10.fromJS(resultData500) : new Exception10();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character assets
     * @character_id Character id of the target character
     * @datasource The server name you would like data from
     * @return A flat list of the users assets
     */
    get_characters_character_id_assets(character_id: number, datasource: Datasource8): Promise<Response6[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/assets?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_assets(response);
        });
    }

    private processGet_characters_character_id_assets(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response6[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response6.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception11 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception11.fromJS(resultData403) : new Exception11();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception12 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception12.fromJS(resultData500) : new Exception12();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List bookmarks
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return A list of bookmarks
     */
    get_characters_character_id_bookmarks(character_id: number, datasource: Datasource9): Promise<Response7[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/bookmarks?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_bookmarks(response);
        });
    }

    private processGet_characters_character_id_bookmarks(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response7[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response7.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception13 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception13.fromJS(resultData403) : new Exception13();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception14 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception14.fromJS(resultData500) : new Exception14();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List bookmark folders
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return List of bookmark folders
     */
    get_characters_character_id_bookmarks_folders(character_id: number, datasource: Datasource10): Promise<Response8[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/bookmarks/folders?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_bookmarks_folders(response);
        });
    }

    private processGet_characters_character_id_bookmarks_folders(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response8[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response8.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception15 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception15.fromJS(resultData403) : new Exception15();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception16 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception16.fromJS(resultData500) : new Exception16();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List calendar event summaries
     * @character_id The character to retrieve events from
     * @from_event The event ID to retrieve events from
     * @datasource The server name you would like data from
     * @return A collection of event summaries
     */
    get_characters_character_id_calendar(character_id: number, from_event: number, datasource: Datasource11): Promise<Response9[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/calendar?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (from_event !== undefined)
            url_ += "from_event=" + encodeURIComponent("" + from_event) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_calendar(response);
        });
    }

    private processGet_characters_character_id_calendar(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response9[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response9.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception17 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception17.fromJS(resultData403) : new Exception17();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception18 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception18.fromJS(resultData500) : new Exception18();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get an event
     * @character_id The character id requesting the event
     * @event_id The id of the event requested
     * @datasource The server name you would like data from
     * @return Full details of a specific event
     */
    get_characters_character_id_calendar_event_id(character_id: number, event_id: number, datasource: Datasource12): Promise<Response10> {
        let url_ = this.baseUrl + "/characters/{character_id}/calendar/{event_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (event_id === undefined || event_id === null)
            throw new Error("The parameter 'event_id' must be defined.");
        url_ = url_.replace("{event_id}", encodeURIComponent("" + event_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_calendar_event_id(response);
        });
    }

    private processGet_characters_character_id_calendar_event_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response10 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response10.fromJS(resultData200) : new Response10();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception19 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception19.fromJS(resultData403) : new Exception19();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception20 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception20.fromJS(resultData500) : new Exception20();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Respond to an event
     * @character_id The character ID requesting the event
     * @event_id The ID of the event requested
     * @response The response value to set, overriding current value.
     * @datasource The server name you would like data from
     * @return Event updated
     */
    put_characters_character_id_calendar_event_id(character_id: number, event_id: number, response: Response11, datasource: Datasource13): Promise<void> {
        let url_ = this.baseUrl + "/characters/{character_id}/calendar/{event_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (event_id === undefined || event_id === null)
            throw new Error("The parameter 'event_id' must be defined.");
        url_ = url_.replace("{event_id}", encodeURIComponent("" + event_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(response ? response.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPut_characters_character_id_calendar_event_id(response);
        });
    }

    private processPut_characters_character_id_calendar_event_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "204") {
            }
            else
            if (status === "403") {
                let result403: Exception21 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception21.fromJS(resultData403) : new Exception21();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception22 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception22.fromJS(resultData500) : new Exception22();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get clones
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Clone information for the given character
     */
    get_characters_character_id_clones(character_id: number, datasource: Datasource14): Promise<Response12> {
        let url_ = this.baseUrl + "/characters/{character_id}/clones?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_clones(response);
        });
    }

    private processGet_characters_character_id_clones(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response12 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response12.fromJS(resultData200) : new Response12();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception23 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception23.fromJS(resultData403) : new Exception23();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception24 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception24.fromJS(resultData500) : new Exception24();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation history
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Corporation history for the given character
     */
    get_characters_character_id_corporationhistory(character_id: number, datasource: Datasource15): Promise<Response13[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/corporationhistory?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_corporationhistory(response);
        });
    }

    private processGet_characters_character_id_corporationhistory(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response13[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response13.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception25 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception25.fromJS(resultData500) : new Exception25();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Calculate a CSPA charge cost
     * @character_id An EVE character ID
     * @characters The target characters to calculate the charge for
     * @datasource The server name you would like data from
     * @return Aggregate cost of sending a mail from the source character to the target characters, in ISK hundredths
     */
    post_characters_character_id_cspa(character_id: number, characters: Characters, datasource: Datasource16): Promise<Response14> {
        let url_ = this.baseUrl + "/characters/{character_id}/cspa?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(characters ? characters.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPost_characters_character_id_cspa(response);
        });
    }

    private processPost_characters_character_id_cspa(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "201") {
                let result201: Response14 = null; 
                let resultData201 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result201 = resultData201 ? Response14.fromJS(resultData201) : new Response14();
                return result201; 
            }
            else
            if (status === "403") {
                let result403: Exception26 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception26.fromJS(resultData403) : new Exception26();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception27 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception27.fromJS(resultData500) : new Exception27();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List kills and losses
     * @character_id An EVE character ID
     * @max_count How many killmails to return at maximum
     * @max_kill_id Only return killmails with ID smaller than this.
     * @datasource The server name you would like data from
     * @return A list of killmail IDs and hashes
     */
    get_characters_character_id_killmails_recent(character_id: number, max_count: number, max_kill_id: number, datasource: Datasource17): Promise<Response15[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/killmails/recent?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (max_count !== undefined)
            url_ += "max_count=" + encodeURIComponent("" + max_count) + "&"; 
        if (max_kill_id !== undefined)
            url_ += "max_kill_id=" + encodeURIComponent("" + max_kill_id) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_killmails_recent(response);
        });
    }

    private processGet_characters_character_id_killmails_recent(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response15[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response15.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception28 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception28.fromJS(resultData403) : new Exception28();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception29 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception29.fromJS(resultData500) : new Exception29();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character location
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable.
     */
    get_characters_character_id_location(character_id: number, datasource: Datasource18): Promise<Response16> {
        let url_ = this.baseUrl + "/characters/{character_id}/location?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_location(response);
        });
    }

    private processGet_characters_character_id_location(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response16 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response16.fromJS(resultData200) : new Response16();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception30 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception30.fromJS(resultData403) : new Exception30();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception31 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception31.fromJS(resultData500) : new Exception31();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Return mail headers
     * @character_id An EVE character ID
     * @labels Fetch only mails that match one or more of the given labels
     * @last_mail_id List only mail with an ID lower than the given ID, if present
     * @datasource The server name you would like data from
     * @return The requested mail
     */
    get_characters_character_id_mail(character_id: number, labels: number[], last_mail_id: number, datasource: Datasource19): Promise<Response17[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (labels !== undefined)
            labels.forEach(item => { url_ += "labels=" + encodeURIComponent("" + item) + "&"; });
        if (last_mail_id !== undefined)
            url_ += "last_mail_id=" + encodeURIComponent("" + last_mail_id) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_mail(response);
        });
    }

    private processGet_characters_character_id_mail(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response17[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response17.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception32 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception32.fromJS(resultData403) : new Exception32();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception33 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception33.fromJS(resultData500) : new Exception33();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Send a new mail
     * @character_id The sender's character ID
     * @mail The mail to send
     * @datasource The server name you would like data from
     * @return Mail created
     */
    post_characters_character_id_mail(character_id: number, mail: Mail, datasource: Datasource20): Promise<number> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(mail ? mail.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPost_characters_character_id_mail(response);
        });
    }

    private processPost_characters_character_id_mail(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "201") {
                let result201: number = null; 
                let resultData201 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result201 = resultData201 !== undefined ? resultData201 : null;
                return result201; 
            }
            else
            if (status === "400") {
                let result400: Exception34 = null; 
                let resultData400 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result400 = resultData400 ? Exception34.fromJS(resultData400) : new Exception34();
                throw result400; 
            }
            else
            if (status === "403") {
                let result403: Exception35 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception35.fromJS(resultData403) : new Exception35();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception36 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception36.fromJS(resultData500) : new Exception36();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get mail labels and unread counts
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return A list of mail labels and unread counts
     */
    get_characters_character_id_mail_labels(character_id: number, datasource: Datasource21): Promise<Response18> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/labels?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_mail_labels(response);
        });
    }

    private processGet_characters_character_id_mail_labels(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response18 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response18.fromJS(resultData200) : new Response18();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception37 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception37.fromJS(resultData403) : new Exception37();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception38 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception38.fromJS(resultData500) : new Exception38();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Create a mail label
     * @character_id An EVE character ID
     * @label Label to create
     * @datasource The server name you would like data from
     * @return Label created
     */
    post_characters_character_id_mail_labels(character_id: number, label: Label, datasource: Datasource22): Promise<number> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/labels?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(label ? label.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPost_characters_character_id_mail_labels(response);
        });
    }

    private processPost_characters_character_id_mail_labels(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "201") {
                let result201: number = null; 
                let resultData201 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result201 = resultData201 !== undefined ? resultData201 : null;
                return result201; 
            }
            else
            if (status === "403") {
                let result403: Exception39 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception39.fromJS(resultData403) : new Exception39();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception40 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception40.fromJS(resultData500) : new Exception40();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Return mailing list subscriptions
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Mailing lists
     */
    get_characters_character_id_mail_lists(character_id: number, datasource: Datasource23): Promise<Response19[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/lists?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_mail_lists(response);
        });
    }

    private processGet_characters_character_id_mail_lists(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response19[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response19.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception41 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception41.fromJS(resultData403) : new Exception41();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception42 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception42.fromJS(resultData500) : new Exception42();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Delete a mail
     * @character_id An EVE character ID
     * @mail_id An EVE mail ID
     * @datasource The server name you would like data from
     * @return Mail deleted
     */
    delete_characters_character_id_mail_mail_id(character_id: number, mail_id: number, datasource: Datasource24): Promise<void> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/{mail_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (mail_id === undefined || mail_id === null)
            throw new Error("The parameter 'mail_id' must be defined.");
        url_ = url_.replace("{mail_id}", encodeURIComponent("" + mail_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = "";
        return this.http.fetch(url_, {
			body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processDelete_characters_character_id_mail_mail_id(response);
        });
    }

    private processDelete_characters_character_id_mail_mail_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "204") {
            }
            else
            if (status === "403") {
                let result403: Exception43 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception43.fromJS(resultData403) : new Exception43();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception44 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception44.fromJS(resultData500) : new Exception44();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Return a mail
     * @character_id An EVE character ID
     * @mail_id An EVE mail ID
     * @datasource The server name you would like data from
     * @return Contents of a mail
     */
    get_characters_character_id_mail_mail_id(character_id: number, mail_id: number, datasource: Datasource25): Promise<Response20> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/{mail_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (mail_id === undefined || mail_id === null)
            throw new Error("The parameter 'mail_id' must be defined.");
        url_ = url_.replace("{mail_id}", encodeURIComponent("" + mail_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_mail_mail_id(response);
        });
    }

    private processGet_characters_character_id_mail_mail_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response20 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response20.fromJS(resultData200) : new Response20();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception45 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception45.fromJS(resultData403) : new Exception45();
                throw result403; 
            }
            else
            if (status === "404") {
                let result404: Exception46 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception46.fromJS(resultData404) : new Exception46();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception47 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception47.fromJS(resultData500) : new Exception47();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Update metadata about a mail
     * @character_id An EVE character ID
     * @mail_id An EVE mail ID
     * @contents Data used to update the mail
     * @datasource The server name you would like data from
     * @return Mail updated
     */
    put_characters_character_id_mail_mail_id(character_id: number, mail_id: number, contents: Contents, datasource: Datasource26): Promise<void> {
        let url_ = this.baseUrl + "/characters/{character_id}/mail/{mail_id}?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (mail_id === undefined || mail_id === null)
            throw new Error("The parameter 'mail_id' must be defined.");
        url_ = url_.replace("{mail_id}", encodeURIComponent("" + mail_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(contents ? contents.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPut_characters_character_id_mail_mail_id(response);
        });
    }

    private processPut_characters_character_id_mail_mail_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "204") {
            }
            else
            if (status === "400") {
                let result400: Exception48 = null; 
                let resultData400 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result400 = resultData400 ? Exception48.fromJS(resultData400) : new Exception48();
                throw result400; 
            }
            else
            if (status === "403") {
                let result403: Exception49 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception49.fromJS(resultData403) : new Exception49();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception50 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception50.fromJS(resultData500) : new Exception50();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character portraits
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Public data for the given character
     */
    get_characters_character_id_portrait(character_id: number, datasource: Datasource27): Promise<Response21> {
        let url_ = this.baseUrl + "/characters/{character_id}/portrait?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_portrait(response);
        });
    }

    private processGet_characters_character_id_portrait(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response21 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response21.fromJS(resultData200) : new Response21();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception51 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception51.fromJS(resultData404) : new Exception51();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception52 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception52.fromJS(resultData500) : new Exception52();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Search on a string
     * @character_id An EVE character ID
     * @search The string to search on
     * @categories Type of entities to search for
     * @language Search locale
     * @strict Whether the search should be a strict match
     * @datasource The server name you would like data from
     * @return A list of search results
     */
    get_characters_character_id_search(character_id: number, search: string, categories: Categories[], language: Language, strict: boolean, datasource: Datasource28): Promise<Response22> {
        let url_ = this.baseUrl + "/characters/{character_id}/search?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (search === undefined || search === null)
            throw new Error("The parameter 'search' must be defined and cannot be null.");
        else
            url_ += "search=" + encodeURIComponent("" + search) + "&"; 
        if (categories === undefined || categories === null)
            throw new Error("The parameter 'categories' must be defined and cannot be null.");
        else
            categories.forEach(item => { url_ += "categories=" + encodeURIComponent("" + item) + "&"; });
        if (language !== undefined)
            url_ += "language=" + encodeURIComponent("" + language) + "&"; 
        if (strict !== undefined)
            url_ += "strict=" + encodeURIComponent("" + strict) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_search(response);
        });
    }

    private processGet_characters_character_id_search(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response22 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response22.fromJS(resultData200) : new Response22();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception53 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception53.fromJS(resultData403) : new Exception53();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception54 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception54.fromJS(resultData500) : new Exception54();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get current ship
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Get the current ship type, name and id
     */
    get_characters_character_id_ship(character_id: number, datasource: Datasource29): Promise<Response23> {
        let url_ = this.baseUrl + "/characters/{character_id}/ship?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_ship(response);
        });
    }

    private processGet_characters_character_id_ship(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response23 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response23.fromJS(resultData200) : new Response23();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception55 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception55.fromJS(resultData403) : new Exception55();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception56 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception56.fromJS(resultData500) : new Exception56();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character's skill queue
     * @character_id Character id of the target character
     * @datasource The server name you would like data from
     * @return The current skill queue, sorted ascending by finishing time
     */
    get_characters_character_id_skillqueue(character_id: number, datasource: Datasource30): Promise<Response24[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/skillqueue?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_skillqueue(response);
        });
    }

    private processGet_characters_character_id_skillqueue(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response24[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response24.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception57 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception57.fromJS(resultData403) : new Exception57();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception58 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception58.fromJS(resultData500) : new Exception58();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get character skills
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Known skills for the character
     */
    get_characters_character_id_skills(character_id: number, datasource: Datasource31): Promise<Response25> {
        let url_ = this.baseUrl + "/characters/{character_id}/skills?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_skills(response);
        });
    }

    private processGet_characters_character_id_skills(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response25 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response25.fromJS(resultData200) : new Response25();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception59 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception59.fromJS(resultData403) : new Exception59();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception60 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception60.fromJS(resultData500) : new Exception60();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List wallets and balances
     * @character_id An EVE character ID
     * @datasource The server name you would like data from
     * @return Wallet data for selected user
     */
    get_characters_character_id_wallets(character_id: number, datasource: Datasource32): Promise<Response26[]> {
        let url_ = this.baseUrl + "/characters/{character_id}/wallets?"; 
        if (character_id === undefined || character_id === null)
            throw new Error("The parameter 'character_id' must be defined.");
        url_ = url_.replace("{character_id}", encodeURIComponent("" + character_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_characters_character_id_wallets(response);
        });
    }

    private processGet_characters_character_id_wallets(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response26[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response26.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception61 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception61.fromJS(resultData403) : new Exception61();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception62 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception62.fromJS(resultData500) : new Exception62();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation names
     * @corporation_ids A comma separated list of corporation IDs
     * @datasource The server name you would like data from
     * @return List of id/name associations
     */
    get_corporations_names(corporation_ids: number[], datasource: Datasource33): Promise<Response27[]> {
        let url_ = this.baseUrl + "/corporations/names?"; 
        if (corporation_ids === undefined || corporation_ids === null)
            throw new Error("The parameter 'corporation_ids' must be defined and cannot be null.");
        else
            corporation_ids.forEach(item => { url_ += "corporation_ids=" + encodeURIComponent("" + item) + "&"; });
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_names(response);
        });
    }

    private processGet_corporations_names(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response27[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response27.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception63 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception63.fromJS(resultData500) : new Exception63();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation information
     * @corporation_id An Eve corporation ID
     * @datasource The server name you would like data from
     * @return Public data about a corporation
     */
    get_corporations_corporation_id(corporation_id: number, datasource: Datasource34): Promise<Response28> {
        let url_ = this.baseUrl + "/corporations/{corporation_id}?"; 
        if (corporation_id === undefined || corporation_id === null)
            throw new Error("The parameter 'corporation_id' must be defined.");
        url_ = url_.replace("{corporation_id}", encodeURIComponent("" + corporation_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_corporation_id(response);
        });
    }

    private processGet_corporations_corporation_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response28 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response28.fromJS(resultData200) : new Response28();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception64 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception64.fromJS(resultData404) : new Exception64();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception65 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception65.fromJS(resultData500) : new Exception65();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get alliance history
     * @corporation_id An EVE corporation ID
     * @datasource The server name you would like data from
     * @return Alliance history for the given corporation
     */
    get_corporations_corporation_id_alliancehistory(corporation_id: number, datasource: Datasource35): Promise<Response29[]> {
        let url_ = this.baseUrl + "/corporations/{corporation_id}/alliancehistory?"; 
        if (corporation_id === undefined || corporation_id === null)
            throw new Error("The parameter 'corporation_id' must be defined.");
        url_ = url_.replace("{corporation_id}", encodeURIComponent("" + corporation_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_corporation_id_alliancehistory(response);
        });
    }

    private processGet_corporations_corporation_id_alliancehistory(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response29[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response29.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception66 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception66.fromJS(resultData500) : new Exception66();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation icon
     * @corporation_id An EVE corporation ID
     * @datasource The server name you would like data from
     * @return Urls for icons for the given corporation id and server
     */
    get_corporations_corporation_id_icons(corporation_id: number, datasource: Datasource36): Promise<Response30> {
        let url_ = this.baseUrl + "/corporations/{corporation_id}/icons?"; 
        if (corporation_id === undefined || corporation_id === null)
            throw new Error("The parameter 'corporation_id' must be defined.");
        url_ = url_.replace("{corporation_id}", encodeURIComponent("" + corporation_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_corporation_id_icons(response);
        });
    }

    private processGet_corporations_corporation_id_icons(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response30 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response30.fromJS(resultData200) : new Response30();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception67 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception67.fromJS(resultData404) : new Exception67();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception68 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception68.fromJS(resultData500) : new Exception68();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation members
     * @corporation_id A corporation ID
     * @datasource The server name you would like data from
     * @return List of member character IDs
     */
    get_corporations_corporation_id_members(corporation_id: number, datasource: Datasource37): Promise<Response31[]> {
        let url_ = this.baseUrl + "/corporations/{corporation_id}/members?"; 
        if (corporation_id === undefined || corporation_id === null)
            throw new Error("The parameter 'corporation_id' must be defined.");
        url_ = url_.replace("{corporation_id}", encodeURIComponent("" + corporation_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_corporation_id_members(response);
        });
    }

    private processGet_corporations_corporation_id_members(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response31[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response31.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception69 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception69.fromJS(resultData403) : new Exception69();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception70 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception70.fromJS(resultData500) : new Exception70();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get corporation member roles
     * @corporation_id A corporation ID
     * @datasource The server name you would like data from
     * @return List of member character ID's and roles
     */
    get_corporations_corporation_id_roles(corporation_id: number, datasource: Datasource38): Promise<Response32[]> {
        let url_ = this.baseUrl + "/corporations/{corporation_id}/roles?"; 
        if (corporation_id === undefined || corporation_id === null)
            throw new Error("The parameter 'corporation_id' must be defined.");
        url_ = url_.replace("{corporation_id}", encodeURIComponent("" + corporation_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_corporations_corporation_id_roles(response);
        });
    }

    private processGet_corporations_corporation_id_roles(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response32[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response32.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception71 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception71.fromJS(resultData403) : new Exception71();
                throw result403; 
            }
            else
            if (status === "500") {
                let result500: Exception72 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception72.fromJS(resultData500) : new Exception72();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List incursions
     * @datasource The server name you would like data from
     * @return A list of incursions
     */
    get_incursions(datasource: Datasource39): Promise<Response33[]> {
        let url_ = this.baseUrl + "/incursions?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_incursions(response);
        });
    }

    private processGet_incursions(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response33[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response33.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception73 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception73.fromJS(resultData500) : new Exception73();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List insurance levels
     * @accept_Language Language to use in the response
     * @datasource The server name you would like data from
     * @return A list of insurance levels for all ship types
     */
    get_insurance_prices(accept_Language: string, datasource: Datasource40): Promise<Response34[]> {
        let url_ = this.baseUrl + "/insurance/prices?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Accept-Language": "en",
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_insurance_prices(response);
        });
    }

    private processGet_insurance_prices(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response34[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response34.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception74 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception74.fromJS(resultData500) : new Exception74();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get a single killmail
     * @killmail_id The killmail ID to be queried
     * @killmail_hash The killmail hash for verification
     * @datasource The server name you would like data from
     * @return A killmail
     */
    get_killmails_killmail_id_killmail_hash(killmail_id: number, killmail_hash: string, datasource: Datasource41): Promise<Response35> {
        let url_ = this.baseUrl + "/killmails/{killmail_id}/{killmail_hash}?"; 
        if (killmail_id === undefined || killmail_id === null)
            throw new Error("The parameter 'killmail_id' must be defined.");
        url_ = url_.replace("{killmail_id}", encodeURIComponent("" + killmail_id)); 
        if (killmail_hash === undefined || killmail_hash === null)
            throw new Error("The parameter 'killmail_hash' must be defined.");
        url_ = url_.replace("{killmail_hash}", encodeURIComponent("" + killmail_hash)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_killmails_killmail_id_killmail_hash(response);
        });
    }

    private processGet_killmails_killmail_id_killmail_hash(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response35 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response35.fromJS(resultData200) : new Response35();
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception75 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception75.fromJS(resultData422) : new Exception75();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception76 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception76.fromJS(resultData500) : new Exception76();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List market prices
     * @datasource The server name you would like data from
     * @return A list of prices
     */
    get_markets_prices(datasource: Datasource42): Promise<Response36[]> {
        let url_ = this.baseUrl + "/markets/prices?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_markets_prices(response);
        });
    }

    private processGet_markets_prices(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response36[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response36.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception77 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception77.fromJS(resultData500) : new Exception77();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List historical market statistics in a region
     * @region_id Return statistics in this region
     * @type_id Return statistics for this type
     * @datasource The server name you would like data from
     * @return A list of historical market statistics
     */
    get_markets_region_id_history(region_id: number, type_id: number, datasource: Datasource43): Promise<Response37[]> {
        let url_ = this.baseUrl + "/markets/{region_id}/history?"; 
        if (region_id === undefined || region_id === null)
            throw new Error("The parameter 'region_id' must be defined.");
        url_ = url_.replace("{region_id}", encodeURIComponent("" + region_id)); 
        if (type_id === undefined || type_id === null)
            throw new Error("The parameter 'type_id' must be defined and cannot be null.");
        else
            url_ += "type_id=" + encodeURIComponent("" + type_id) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_markets_region_id_history(response);
        });
    }

    private processGet_markets_region_id_history(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response37[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response37.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception78 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception78.fromJS(resultData422) : new Exception78();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception79 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception79.fromJS(resultData500) : new Exception79();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List orders in a region
     * @region_id Return orders in this region
     * @type_id Return orders only for this type
     * @order_type Filter buy/sell orders, return all orders by default. If you query without type_id, we always return both buy and sell orders.
     * @page Which page to query, only used for querying without type_id. Starting at 1
     * @datasource The server name you would like data from
     * @return A list of orders
     */
    get_markets_region_id_orders(region_id: number, type_id: number, order_type: Order_type, page: number, datasource: Datasource44): Promise<Response38[]> {
        let url_ = this.baseUrl + "/markets/{region_id}/orders?"; 
        if (region_id === undefined || region_id === null)
            throw new Error("The parameter 'region_id' must be defined.");
        url_ = url_.replace("{region_id}", encodeURIComponent("" + region_id)); 
        if (type_id !== undefined)
            url_ += "type_id=" + encodeURIComponent("" + type_id) + "&"; 
        if (order_type === undefined || order_type === null)
            throw new Error("The parameter 'order_type' must be defined and cannot be null.");
        else
            url_ += "order_type=" + encodeURIComponent("" + order_type) + "&"; 
        if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_markets_region_id_orders(response);
        });
    }

    private processGet_markets_region_id_orders(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response38[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response38.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception80 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception80.fromJS(resultData422) : new Exception80();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception81 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception81.fromJS(resultData500) : new Exception81();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Search on a string
     * @search The string to search on
     * @categories Type of entities to search for
     * @language Search locale
     * @strict Whether the search should be a strict match
     * @datasource The server name you would like data from
     * @return A list of search results
     */
    get_search(search: string, categories: Categories2[], language: Language2, strict: boolean, datasource: Datasource45): Promise<Response39> {
        let url_ = this.baseUrl + "/search?"; 
        if (search === undefined || search === null)
            throw new Error("The parameter 'search' must be defined and cannot be null.");
        else
            url_ += "search=" + encodeURIComponent("" + search) + "&"; 
        if (categories === undefined || categories === null)
            throw new Error("The parameter 'categories' must be defined and cannot be null.");
        else
            categories.forEach(item => { url_ += "categories=" + encodeURIComponent("" + item) + "&"; });
        if (language !== undefined)
            url_ += "language=" + encodeURIComponent("" + language) + "&"; 
        if (strict !== undefined)
            url_ += "strict=" + encodeURIComponent("" + strict) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_search(response);
        });
    }

    private processGet_search(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response39 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response39.fromJS(resultData200) : new Response39();
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception82 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception82.fromJS(resultData500) : new Exception82();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List sovereignty campaigns
     * @datasource The server name you would like data from
     * @return A list of sovereignty campaigns
     */
    get_sovereignty_campaigns(datasource: Datasource46): Promise<Response40[]> {
        let url_ = this.baseUrl + "/sovereignty/campaigns?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_sovereignty_campaigns(response);
        });
    }

    private processGet_sovereignty_campaigns(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response40[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response40.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception83 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception83.fromJS(resultData500) : new Exception83();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List sovereignty structures
     * @datasource The server name you would like data from
     * @return A list of sovereignty structures
     */
    get_sovereignty_structures(datasource: Datasource47): Promise<Response41[]> {
        let url_ = this.baseUrl + "/sovereignty/structures?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_sovereignty_structures(response);
        });
    }

    private processGet_sovereignty_structures(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response41[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response41.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception84 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception84.fromJS(resultData500) : new Exception84();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get names and categories for a set of ID's
     * @ids The ids to resolve
     * @datasource The server name you would like data from
     * @return List of id/name associations for a set of ID's. ID's that cannot be resolved are not returned.
     */
    post_universe_names(ids: Ids, datasource: Datasource48): Promise<Response42[]> {
        let url_ = this.baseUrl + "/universe/names?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        const content_ = JSON.stringify(ids ? ids.toJS() : null);
        return this.http.fetch(url_, {
			body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processPost_universe_names(response);
        });
    }

    private processPost_universe_names(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response42[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response42.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception85 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception85.fromJS(resultData404) : new Exception85();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception86 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception86.fromJS(resultData500) : new Exception86();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get station information
     * @station_id An Eve station ID
     * @datasource The server name you would like data from
     * @return Public data about a station
     */
    get_universe_stations_station_id(station_id: number, datasource: Datasource49): Promise<Response43> {
        let url_ = this.baseUrl + "/universe/stations/{station_id}?"; 
        if (station_id === undefined || station_id === null)
            throw new Error("The parameter 'station_id' must be defined.");
        url_ = url_.replace("{station_id}", encodeURIComponent("" + station_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_universe_stations_station_id(response);
        });
    }

    private processGet_universe_stations_station_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response43 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response43.fromJS(resultData200) : new Response43();
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception87 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception87.fromJS(resultData500) : new Exception87();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List all public structures
     * @datasource The server name you would like data from
     * @return List of public structure IDs
     */
    get_universe_structures(datasource: Datasource50): Promise<number[]> {
        let url_ = this.baseUrl + "/universe/structures?"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_universe_structures(response);
        });
    }

    private processGet_universe_structures(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: number[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(item);
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception88 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception88.fromJS(resultData500) : new Exception88();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get structure information
     * @structure_id An Eve structure ID
     * @datasource The server name you would like data from
     * @return Data about a structure
     */
    get_universe_structures_structure_id(structure_id: number, datasource: Datasource51): Promise<Response44> {
        let url_ = this.baseUrl + "/universe/structures/{structure_id}?"; 
        if (structure_id === undefined || structure_id === null)
            throw new Error("The parameter 'structure_id' must be defined.");
        url_ = url_.replace("{structure_id}", encodeURIComponent("" + structure_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_universe_structures_structure_id(response);
        });
    }

    private processGet_universe_structures_structure_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response44 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response44.fromJS(resultData200) : new Response44();
                return result200; 
            }
            else
            if (status === "403") {
                let result403: Exception89 = null; 
                let resultData403 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result403 = resultData403 ? Exception89.fromJS(resultData403) : new Exception89();
                throw result403; 
            }
            else
            if (status === "404") {
                let result404: Exception90 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception90.fromJS(resultData404) : new Exception90();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception91 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception91.fromJS(resultData500) : new Exception91();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get solar system information
     * @system_id An Eve solar system ID
     * @datasource The server name you would like data from
     * @return Data about a solar system
     */
    get_universe_systems_system_id(system_id: number, datasource: Datasource52): Promise<Response45> {
        let url_ = this.baseUrl + "/universe/systems/{system_id}?"; 
        if (system_id === undefined || system_id === null)
            throw new Error("The parameter 'system_id' must be defined.");
        url_ = url_.replace("{system_id}", encodeURIComponent("" + system_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_universe_systems_system_id(response);
        });
    }

    private processGet_universe_systems_system_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response45 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response45.fromJS(resultData200) : new Response45();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception92 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception92.fromJS(resultData404) : new Exception92();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception93 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception93.fromJS(resultData500) : new Exception93();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get type information
     * @type_id An Eve item type ID
     * @datasource The server name you would like data from
     * @return Public data about a type
     */
    get_universe_types_type_id(type_id: number, datasource: Datasource53): Promise<Response46> {
        let url_ = this.baseUrl + "/universe/types/{type_id}?"; 
        if (type_id === undefined || type_id === null)
            throw new Error("The parameter 'type_id' must be defined.");
        url_ = url_.replace("{type_id}", encodeURIComponent("" + type_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_universe_types_type_id(response);
        });
    }

    private processGet_universe_types_type_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response46 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response46.fromJS(resultData200) : new Response46();
                return result200; 
            }
            else
            if (status === "404") {
                let result404: Exception94 = null; 
                let resultData404 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result404 = resultData404 ? Exception94.fromJS(resultData404) : new Exception94();
                throw result404; 
            }
            else
            if (status === "500") {
                let result500: Exception95 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception95.fromJS(resultData500) : new Exception95();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List wars
     * @page Which page to query, starting at 1, 2000 wars per page.
     * @datasource The server name you would like data from
     * @return A list of war IDs
     */
    get_wars(page: number, datasource: Datasource54): Promise<number[]> {
        let url_ = this.baseUrl + "/wars?"; 
        if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_wars(response);
        });
    }

    private processGet_wars(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: number[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(item);
                }
                return result200; 
            }
            else
            if (status === "500") {
                let result500: Exception96 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception96.fromJS(resultData500) : new Exception96();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * Get war information
     * @war_id ID for a war
     * @datasource The server name you would like data from
     * @return Details about a war
     */
    get_wars_war_id(war_id: number, datasource: Datasource55): Promise<Response47> {
        let url_ = this.baseUrl + "/wars/{war_id}?"; 
        if (war_id === undefined || war_id === null)
            throw new Error("The parameter 'war_id' must be defined.");
        url_ = url_.replace("{war_id}", encodeURIComponent("" + war_id)); 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_wars_war_id(response);
        });
    }

    private processGet_wars_war_id(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response47 = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result200 = resultData200 ? Response47.fromJS(resultData200) : new Response47();
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception97 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception97.fromJS(resultData422) : new Exception97();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception98 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception98.fromJS(resultData500) : new Exception98();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }

    /**
     * List kills for a war
     * @war_id A valid war ID
     * @page Which page to query, starting at 1, 2000 killmails per page.
     * @datasource The server name you would like data from
     * @return A list of killmail IDs and hashes
     */
    get_wars_war_id_killmails(war_id: number, page: number, datasource: Datasource56): Promise<Response48[]> {
        let url_ = this.baseUrl + "/wars/{war_id}/killmails?"; 
        if (war_id === undefined || war_id === null)
            throw new Error("The parameter 'war_id' must be defined.");
        url_ = url_.replace("{war_id}", encodeURIComponent("" + war_id)); 
        if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&"; 
        if (datasource !== undefined)
            url_ += "datasource=" + encodeURIComponent("" + datasource) + "&";

        return this.http.fetch(url_, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return this.processGet_wars_war_id_killmails(response);
        });
    }

    private processGet_wars_war_id_killmails(response: fetch.Response) {
        return response.text().then((data) => {
            const status = response.status.toString(); 

            if (status === "200") {
                let result200: Response48[] = null; 
                let resultData200 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(Response48.fromJS(item));
                }
                return result200; 
            }
            else
            if (status === "422") {
                let result422: Exception99 = null; 
                let resultData422 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result422 = resultData422 ? Exception99.fromJS(resultData422) : new Exception99();
                throw result422; 
            }
            else
            if (status === "500") {
                let result500: Exception100 = null; 
                let resultData500 = data === "" ? null : JSON.parse(data, this.jsonParseReviver);
                result500 = resultData500 ? Exception100.fromJS(resultData500) : new Exception100();
                throw result500; 
            }
            else
            {
                throw new Error("error_no_callback_for_the_received_http_status"); 
            }
        });
    }
}

/** Internal server error */
export class Exception { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception {
        return new Exception(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response { 
    /** alliance_id integer */
    alliance_id: number; 
    /** alliance_name string */
    alliance_name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.alliance_name = data["alliance_name"] !== undefined ? data["alliance_name"] : null;
        }
    }

    static fromJS(data: any): Response {
        return new Response(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["alliance_name"] = this.alliance_name !== undefined ? this.alliance_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception2 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception2 {
        return new Exception2(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception2(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource2 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response2 { 
    /** the full name of the alliance */
    alliance_name: string; 
    /** date_founded string */
    date_founded: Date; 
    /** executor_corp integer */
    executor_corp: number; 
    /** the short name of the alliance */
    ticker: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_name = data["alliance_name"] !== undefined ? data["alliance_name"] : null;
            this.date_founded = data["date_founded"] ? new Date(data["date_founded"].toString()) : null;
            this.executor_corp = data["executor_corp"] !== undefined ? data["executor_corp"] : null;
            this.ticker = data["ticker"] !== undefined ? data["ticker"] : null;
        }
    }

    static fromJS(data: any): Response2 {
        return new Response2(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_name"] = this.alliance_name !== undefined ? this.alliance_name : null;
        data["date_founded"] = this.date_founded ? this.date_founded.toISOString() : null;
        data["executor_corp"] = this.executor_corp !== undefined ? this.executor_corp : null;
        data["ticker"] = this.ticker !== undefined ? this.ticker : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response2(JSON.parse(json));
    }
}

/** Alliance not found */
export class Exception3 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception3 {
        return new Exception3(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception3(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception4 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception4 {
        return new Exception4(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception4(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource3 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Internal server error */
export class Exception5 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception5 {
        return new Exception5(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception5(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource4 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response3 { 
    /** px128x128 string */
    px128x128?: string; 
    /** px64x64 string */
    px64x64?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.px128x128 = data["px128x128"] !== undefined ? data["px128x128"] : null;
            this.px64x64 = data["px64x64"] !== undefined ? data["px64x64"] : null;
        }
    }

    static fromJS(data: any): Response3 {
        return new Response3(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["px128x128"] = this.px128x128 !== undefined ? this.px128x128 : null;
        data["px64x64"] = this.px64x64 !== undefined ? this.px64x64 : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response3(JSON.parse(json));
    }
}

/** No image server for this datasource */
export class Exception6 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception6 {
        return new Exception6(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception6(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception7 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception7 {
        return new Exception7(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception7(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource5 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response4 { 
    /** character_id integer */
    character_id: number; 
    /** character_name string */
    character_name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.character_id = data["character_id"] !== undefined ? data["character_id"] : null;
            this.character_name = data["character_name"] !== undefined ? data["character_name"] : null;
        }
    }

    static fromJS(data: any): Response4 {
        return new Response4(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["character_id"] = this.character_id !== undefined ? this.character_id : null;
        data["character_name"] = this.character_name !== undefined ? this.character_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response4(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception8 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception8 {
        return new Exception8(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception8(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource6 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response5 { 
    /** ancestry_id integer */
    ancestry_id?: number; 
    /** Creation date of the character */
    birthday: Date; 
    /** bloodline_id integer */
    bloodline_id: number; 
    /** The character's corporation ID */
    corporation_id: number; 
    /** description string */
    description: string; 
    /** gender string */
    gender: Response5Gender; 
    /** The name of the character */
    name: string; 
    /** race_id integer */
    race_id: number; 
    /** security_status number */
    security_status?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.ancestry_id = data["ancestry_id"] !== undefined ? data["ancestry_id"] : null;
            this.birthday = data["birthday"] ? new Date(data["birthday"].toString()) : null;
            this.bloodline_id = data["bloodline_id"] !== undefined ? data["bloodline_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.description = data["description"] !== undefined ? data["description"] : null;
            this.gender = data["gender"] !== undefined ? data["gender"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
            this.race_id = data["race_id"] !== undefined ? data["race_id"] : null;
            this.security_status = data["security_status"] !== undefined ? data["security_status"] : null;
        }
    }

    static fromJS(data: any): Response5 {
        return new Response5(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["ancestry_id"] = this.ancestry_id !== undefined ? this.ancestry_id : null;
        data["birthday"] = this.birthday ? this.birthday.toISOString() : null;
        data["bloodline_id"] = this.bloodline_id !== undefined ? this.bloodline_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["description"] = this.description !== undefined ? this.description : null;
        data["gender"] = this.gender !== undefined ? this.gender : null;
        data["name"] = this.name !== undefined ? this.name : null;
        data["race_id"] = this.race_id !== undefined ? this.race_id : null;
        data["security_status"] = this.security_status !== undefined ? this.security_status : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response5(JSON.parse(json));
    }
}

/** Is not a character ID */
export class Exception9 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception9 {
        return new Exception9(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception9(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception10 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception10 {
        return new Exception10(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception10(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource7 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response6 { 
    /** is_singleton boolean */
    is_singleton: boolean; 
    /** item_id integer */
    item_id: number; 
    /** location_flag string */
    location_flag: Response6Location_flag; 
    /** location_id integer */
    location_id: number; 
    /** location_type string */
    location_type: Response6Location_type; 
    /** quantity integer */
    quantity?: number; 
    /** type_id integer */
    type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.is_singleton = data["is_singleton"] !== undefined ? data["is_singleton"] : null;
            this.item_id = data["item_id"] !== undefined ? data["item_id"] : null;
            this.location_flag = data["location_flag"] !== undefined ? data["location_flag"] : null;
            this.location_id = data["location_id"] !== undefined ? data["location_id"] : null;
            this.location_type = data["location_type"] !== undefined ? data["location_type"] : null;
            this.quantity = data["quantity"] !== undefined ? data["quantity"] : null;
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
        }
    }

    static fromJS(data: any): Response6 {
        return new Response6(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["is_singleton"] = this.is_singleton !== undefined ? this.is_singleton : null;
        data["item_id"] = this.item_id !== undefined ? this.item_id : null;
        data["location_flag"] = this.location_flag !== undefined ? this.location_flag : null;
        data["location_id"] = this.location_id !== undefined ? this.location_id : null;
        data["location_type"] = this.location_type !== undefined ? this.location_type : null;
        data["quantity"] = this.quantity !== undefined ? this.quantity : null;
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response6(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception11 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception11 {
        return new Exception11(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception11(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception12 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception12 {
        return new Exception12(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception12(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource8 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response7 { 
    /** bookmark_id integer */
    bookmark_id: number; 
    /** create_date string */
    create_date: Date; 
    /** creator_id integer */
    creator_id: number; 
    /** folder_id integer */
    folder_id?: number; 
    /** memo string */
    memo: string; 
    /** note string */
    note: string; 
    /** owner_id integer */
    owner_id: number; 
    /** target object */
    target: Target = new Target();

    constructor(data?: any) {
        if (data !== undefined) {
            this.bookmark_id = data["bookmark_id"] !== undefined ? data["bookmark_id"] : null;
            this.create_date = data["create_date"] ? new Date(data["create_date"].toString()) : null;
            this.creator_id = data["creator_id"] !== undefined ? data["creator_id"] : null;
            this.folder_id = data["folder_id"] !== undefined ? data["folder_id"] : null;
            this.memo = data["memo"] !== undefined ? data["memo"] : null;
            this.note = data["note"] !== undefined ? data["note"] : null;
            this.owner_id = data["owner_id"] !== undefined ? data["owner_id"] : null;
            this.target = data["target"] ? Target.fromJS(data["target"]) : new Target();
        }
    }

    static fromJS(data: any): Response7 {
        return new Response7(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["bookmark_id"] = this.bookmark_id !== undefined ? this.bookmark_id : null;
        data["create_date"] = this.create_date ? this.create_date.toISOString() : null;
        data["creator_id"] = this.creator_id !== undefined ? this.creator_id : null;
        data["folder_id"] = this.folder_id !== undefined ? this.folder_id : null;
        data["memo"] = this.memo !== undefined ? this.memo : null;
        data["note"] = this.note !== undefined ? this.note : null;
        data["owner_id"] = this.owner_id !== undefined ? this.owner_id : null;
        data["target"] = this.target ? this.target.toJS() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response7(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception13 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception13 {
        return new Exception13(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception13(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception14 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception14 {
        return new Exception14(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception14(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource9 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response8 { 
    /** folder_id integer */
    folder_id?: number; 
    /** name string */
    name?: string; 
    /** owner_id integer */
    owner_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.folder_id = data["folder_id"] !== undefined ? data["folder_id"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
            this.owner_id = data["owner_id"] !== undefined ? data["owner_id"] : null;
        }
    }

    static fromJS(data: any): Response8 {
        return new Response8(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["folder_id"] = this.folder_id !== undefined ? this.folder_id : null;
        data["name"] = this.name !== undefined ? this.name : null;
        data["owner_id"] = this.owner_id !== undefined ? this.owner_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response8(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception15 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception15 {
        return new Exception15(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception15(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception16 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception16 {
        return new Exception16(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception16(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource10 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** event */
export class Response9 { 
    /** event_date string */
    event_date?: Date; 
    /** event_id integer */
    event_id?: number; 
    /** event_response string */
    event_response?: Response9Event_response; 
    /** importance integer */
    importance?: number; 
    /** title string */
    title?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.event_date = data["event_date"] ? new Date(data["event_date"].toString()) : null;
            this.event_id = data["event_id"] !== undefined ? data["event_id"] : null;
            this.event_response = data["event_response"] !== undefined ? data["event_response"] : null;
            this.importance = data["importance"] !== undefined ? data["importance"] : null;
            this.title = data["title"] !== undefined ? data["title"] : null;
        }
    }

    static fromJS(data: any): Response9 {
        return new Response9(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["event_date"] = this.event_date ? this.event_date.toISOString() : null;
        data["event_id"] = this.event_id !== undefined ? this.event_id : null;
        data["event_response"] = this.event_response !== undefined ? this.event_response : null;
        data["importance"] = this.importance !== undefined ? this.importance : null;
        data["title"] = this.title !== undefined ? this.title : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response9(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception17 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception17 {
        return new Exception17(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception17(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception18 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception18 {
        return new Exception18(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception18(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource11 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Full details of a specific event */
export class Response10 { 
    /** date string */
    date: Date; 
    /** Length in minutes */
    duration: number; 
    /** event_id integer */
    event_id: number; 
    /** importance integer */
    importance: number; 
    /** owner_id integer */
    owner_id: number; 
    /** owner_name string */
    owner_name: string; 
    /** owner_type string */
    owner_type: Response10Owner_type; 
    /** response string */
    response: string; 
    /** text string */
    text: string; 
    /** title string */
    title: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.date = data["date"] ? new Date(data["date"].toString()) : null;
            this.duration = data["duration"] !== undefined ? data["duration"] : null;
            this.event_id = data["event_id"] !== undefined ? data["event_id"] : null;
            this.importance = data["importance"] !== undefined ? data["importance"] : null;
            this.owner_id = data["owner_id"] !== undefined ? data["owner_id"] : null;
            this.owner_name = data["owner_name"] !== undefined ? data["owner_name"] : null;
            this.owner_type = data["owner_type"] !== undefined ? data["owner_type"] : null;
            this.response = data["response"] !== undefined ? data["response"] : null;
            this.text = data["text"] !== undefined ? data["text"] : null;
            this.title = data["title"] !== undefined ? data["title"] : null;
        }
    }

    static fromJS(data: any): Response10 {
        return new Response10(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["date"] = this.date ? this.date.toISOString() : null;
        data["duration"] = this.duration !== undefined ? this.duration : null;
        data["event_id"] = this.event_id !== undefined ? this.event_id : null;
        data["importance"] = this.importance !== undefined ? this.importance : null;
        data["owner_id"] = this.owner_id !== undefined ? this.owner_id : null;
        data["owner_name"] = this.owner_name !== undefined ? this.owner_name : null;
        data["owner_type"] = this.owner_type !== undefined ? this.owner_type : null;
        data["response"] = this.response !== undefined ? this.response : null;
        data["text"] = this.text !== undefined ? this.text : null;
        data["title"] = this.title !== undefined ? this.title : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response10(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception19 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception19 {
        return new Exception19(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception19(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception20 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception20 {
        return new Exception20(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception20(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource12 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Forbidden */
export class Exception21 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception21 {
        return new Exception21(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception21(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception22 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception22 {
        return new Exception22(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception22(JSON.parse(json));
    }
}

/** response schema */
export class Response11 { 
    /** response string */
    response: Response11Response;

    constructor(data?: any) {
        if (data !== undefined) {
            this.response = data["response"] !== undefined ? data["response"] : null;
        }
    }

    static fromJS(data: any): Response11 {
        return new Response11(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["response"] = this.response !== undefined ? this.response : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response11(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource13 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response12 { 
    /** home_location object */
    home_location?: Home_location; 
    /** jump_clones array */
    jump_clones: Jump_clones[] = []; 
    /** last_jump_date string */
    last_jump_date?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.home_location = data["home_location"] ? Home_location.fromJS(data["home_location"]) : null;
            if (data["jump_clones"] && data["jump_clones"].constructor === Array) {
                this.jump_clones = [];
                for (let item of data["jump_clones"])
                    this.jump_clones.push(Jump_clones.fromJS(item));
            }
            this.last_jump_date = data["last_jump_date"] ? new Date(data["last_jump_date"].toString()) : null;
        }
    }

    static fromJS(data: any): Response12 {
        return new Response12(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["home_location"] = this.home_location ? this.home_location.toJS() : null;
        if (this.jump_clones && this.jump_clones.constructor === Array) {
            data["jump_clones"] = [];
            for (let item of this.jump_clones)
                data["jump_clones"].push(item.toJS());
        }
        data["last_jump_date"] = this.last_jump_date ? this.last_jump_date.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response12(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception23 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception23 {
        return new Exception23(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception23(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception24 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception24 {
        return new Exception24(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception24(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource14 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response13 { 
    /** corporation_id integer */
    corporation_id?: number; 
    /** True if the corporation has been deleted */
    is_deleted?: boolean; 
    /** An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous */
    record_id?: number; 
    /** start_date string */
    start_date?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.is_deleted = data["is_deleted"] !== undefined ? data["is_deleted"] : null;
            this.record_id = data["record_id"] !== undefined ? data["record_id"] : null;
            this.start_date = data["start_date"] ? new Date(data["start_date"].toString()) : null;
        }
    }

    static fromJS(data: any): Response13 {
        return new Response13(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["is_deleted"] = this.is_deleted !== undefined ? this.is_deleted : null;
        data["record_id"] = this.record_id !== undefined ? this.record_id : null;
        data["start_date"] = this.start_date ? this.start_date.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response13(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception25 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception25 {
        return new Exception25(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception25(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource15 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 201 created object */
export class Response14 { 
    /** cost integer */
    cost?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.cost = data["cost"] !== undefined ? data["cost"] : null;
        }
    }

    static fromJS(data: any): Response14 {
        return new Response14(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["cost"] = this.cost !== undefined ? this.cost : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response14(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception26 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception26 {
        return new Exception26(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception26(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception27 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception27 {
        return new Exception27(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception27(JSON.parse(json));
    }
}

/** characters schema */
export class Characters { 
    /** characters array */
    characters: number[] = [];

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["characters"] && data["characters"].constructor === Array) {
                this.characters = [];
                for (let item of data["characters"])
                    this.characters.push(item);
            }
        }
    }

    static fromJS(data: any): Characters {
        return new Characters(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.characters && this.characters.constructor === Array) {
            data["characters"] = [];
            for (let item of this.characters)
                data["characters"].push(item);
        }
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Characters(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource16 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response15 { 
    /** A hash of this killmail */
    killmail_hash: string; 
    /** ID of this killmail */
    killmail_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.killmail_hash = data["killmail_hash"] !== undefined ? data["killmail_hash"] : null;
            this.killmail_id = data["killmail_id"] !== undefined ? data["killmail_id"] : null;
        }
    }

    static fromJS(data: any): Response15 {
        return new Response15(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["killmail_hash"] = this.killmail_hash !== undefined ? this.killmail_hash : null;
        data["killmail_id"] = this.killmail_id !== undefined ? this.killmail_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response15(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception28 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception28 {
        return new Exception28(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception28(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception29 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception29 {
        return new Exception29(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception29(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource17 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response16 { 
    /** solar_system_id integer */
    solar_system_id: number; 
    /** station_id integer */
    station_id?: number; 
    /** structure_id integer */
    structure_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.station_id = data["station_id"] !== undefined ? data["station_id"] : null;
            this.structure_id = data["structure_id"] !== undefined ? data["structure_id"] : null;
        }
    }

    static fromJS(data: any): Response16 {
        return new Response16(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["station_id"] = this.station_id !== undefined ? this.station_id : null;
        data["structure_id"] = this.structure_id !== undefined ? this.structure_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response16(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception30 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception30 {
        return new Exception30(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception30(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception31 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception31 {
        return new Exception31(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception31(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource18 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response17 { 
    /** From whom the mail was sent */
    from?: number; 
    /** is_read boolean */
    is_read?: boolean; 
    /** labels array */
    labels?: number[]; 
    /** mail_id integer */
    mail_id?: number; 
    /** Recipients of the mail */
    recipients?: Recipients[]; 
    /** Mail subject */
    subject?: string; 
    /** When the mail was sent */
    timestamp?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.from = data["from"] !== undefined ? data["from"] : null;
            this.is_read = data["is_read"] !== undefined ? data["is_read"] : null;
            if (data["labels"] && data["labels"].constructor === Array) {
                this.labels = [];
                for (let item of data["labels"])
                    this.labels.push(item);
            }
            this.mail_id = data["mail_id"] !== undefined ? data["mail_id"] : null;
            if (data["recipients"] && data["recipients"].constructor === Array) {
                this.recipients = [];
                for (let item of data["recipients"])
                    this.recipients.push(Recipients.fromJS(item));
            }
            this.subject = data["subject"] !== undefined ? data["subject"] : null;
            this.timestamp = data["timestamp"] ? new Date(data["timestamp"].toString()) : null;
        }
    }

    static fromJS(data: any): Response17 {
        return new Response17(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["from"] = this.from !== undefined ? this.from : null;
        data["is_read"] = this.is_read !== undefined ? this.is_read : null;
        if (this.labels && this.labels.constructor === Array) {
            data["labels"] = [];
            for (let item of this.labels)
                data["labels"].push(item);
        }
        data["mail_id"] = this.mail_id !== undefined ? this.mail_id : null;
        if (this.recipients && this.recipients.constructor === Array) {
            data["recipients"] = [];
            for (let item of this.recipients)
                data["recipients"].push(item.toJS());
        }
        data["subject"] = this.subject !== undefined ? this.subject : null;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response17(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception32 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception32 {
        return new Exception32(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception32(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception33 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception33 {
        return new Exception33(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception33(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource19 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Bad request */
export class Exception34 { 
    /** Bad request message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception34 {
        return new Exception34(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception34(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception35 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception35 {
        return new Exception35(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception35(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception36 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception36 {
        return new Exception36(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception36(JSON.parse(json));
    }
}

/** mail schema */
export class Mail { 
    /** approved_cost integer */
    approved_cost?: number = 0; 
    /** body string */
    body: string; 
    /** recipients array */
    recipients: Recipients[] = []; 
    /** subject string */
    subject: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.approved_cost = data["approved_cost"] !== undefined ? data["approved_cost"] : 0;
            this.body = data["body"] !== undefined ? data["body"] : null;
            if (data["recipients"] && data["recipients"].constructor === Array) {
                this.recipients = [];
                for (let item of data["recipients"])
                    this.recipients.push(Recipients.fromJS(item));
            }
            this.subject = data["subject"] !== undefined ? data["subject"] : null;
        }
    }

    static fromJS(data: any): Mail {
        return new Mail(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["approved_cost"] = this.approved_cost !== undefined ? this.approved_cost : 0;
        data["body"] = this.body !== undefined ? this.body : null;
        if (this.recipients && this.recipients.constructor === Array) {
            data["recipients"] = [];
            for (let item of this.recipients)
                data["recipients"].push(item.toJS());
        }
        data["subject"] = this.subject !== undefined ? this.subject : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Mail(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource20 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response18 { 
    /** labels array */
    labels?: Labels[]; 
    /** total_unread_count integer */
    total_unread_count?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["labels"] && data["labels"].constructor === Array) {
                this.labels = [];
                for (let item of data["labels"])
                    this.labels.push(Labels.fromJS(item));
            }
            this.total_unread_count = data["total_unread_count"] !== undefined ? data["total_unread_count"] : null;
        }
    }

    static fromJS(data: any): Response18 {
        return new Response18(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.labels && this.labels.constructor === Array) {
            data["labels"] = [];
            for (let item of this.labels)
                data["labels"].push(item.toJS());
        }
        data["total_unread_count"] = this.total_unread_count !== undefined ? this.total_unread_count : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response18(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception37 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception37 {
        return new Exception37(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception37(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception38 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception38 {
        return new Exception38(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception38(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource21 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Forbidden */
export class Exception39 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception39 {
        return new Exception39(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception39(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception40 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception40 {
        return new Exception40(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception40(JSON.parse(json));
    }
}

/** label object */
export class Label { 
    /** Hexadecimal string representing label color,
in RGB format
 */
    color?: "#ffffff"; 
    /** name string */
    name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.color = data["color"] !== undefined ? data["color"] : "#ffffff";
            this.name = data["name"] !== undefined ? data["name"] : null;
        }
    }

    static fromJS(data: any): Label {
        return new Label(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["color"] = this.color !== undefined ? this.color : "#ffffff";
        data["name"] = this.name !== undefined ? this.name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Label(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource22 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response19 { 
    /** Mailing list ID */
    mailing_list_id: number; 
    /** name string */
    name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.mailing_list_id = data["mailing_list_id"] !== undefined ? data["mailing_list_id"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
        }
    }

    static fromJS(data: any): Response19 {
        return new Response19(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["mailing_list_id"] = this.mailing_list_id !== undefined ? this.mailing_list_id : null;
        data["name"] = this.name !== undefined ? this.name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response19(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception41 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception41 {
        return new Exception41(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception41(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception42 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception42 {
        return new Exception42(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception42(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource23 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Forbidden */
export class Exception43 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception43 {
        return new Exception43(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception43(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception44 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception44 {
        return new Exception44(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception44(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource24 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response20 { 
    /** Mail's body */
    body?: string; 
    /** From whom the mail was sent */
    from?: number; 
    /** Labels attached to the mail */
    labels?: number[]; 
    /** Whether the mail is flagged as read */
    read?: boolean; 
    /** Recipients of the mail */
    recipients?: Recipients[]; 
    /** Mail subject */
    subject?: string; 
    /** When the mail was sent */
    timestamp?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.body = data["body"] !== undefined ? data["body"] : null;
            this.from = data["from"] !== undefined ? data["from"] : null;
            if (data["labels"] && data["labels"].constructor === Array) {
                this.labels = [];
                for (let item of data["labels"])
                    this.labels.push(item);
            }
            this.read = data["read"] !== undefined ? data["read"] : null;
            if (data["recipients"] && data["recipients"].constructor === Array) {
                this.recipients = [];
                for (let item of data["recipients"])
                    this.recipients.push(Recipients.fromJS(item));
            }
            this.subject = data["subject"] !== undefined ? data["subject"] : null;
            this.timestamp = data["timestamp"] ? new Date(data["timestamp"].toString()) : null;
        }
    }

    static fromJS(data: any): Response20 {
        return new Response20(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["body"] = this.body !== undefined ? this.body : null;
        data["from"] = this.from !== undefined ? this.from : null;
        if (this.labels && this.labels.constructor === Array) {
            data["labels"] = [];
            for (let item of this.labels)
                data["labels"].push(item);
        }
        data["read"] = this.read !== undefined ? this.read : null;
        if (this.recipients && this.recipients.constructor === Array) {
            data["recipients"] = [];
            for (let item of this.recipients)
                data["recipients"].push(item.toJS());
        }
        data["subject"] = this.subject !== undefined ? this.subject : null;
        data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response20(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception45 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception45 {
        return new Exception45(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception45(JSON.parse(json));
    }
}

/** Not found */
export class Exception46 { 
    /** Not found message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception46 {
        return new Exception46(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception46(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception47 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception47 {
        return new Exception47(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception47(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource25 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Bad request */
export class Exception48 { 
    /** Bad request message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception48 {
        return new Exception48(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception48(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception49 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception49 {
        return new Exception49(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception49(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception50 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception50 {
        return new Exception50(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception50(JSON.parse(json));
    }
}

/** contents object */
export class Contents { 
    /** Labels to assign to the mail. Pre-existing labels are unassigned. */
    labels?: number[]; 
    /** Whether the mail is flagged as read */
    read?: boolean;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["labels"] && data["labels"].constructor === Array) {
                this.labels = [];
                for (let item of data["labels"])
                    this.labels.push(item);
            }
            this.read = data["read"] !== undefined ? data["read"] : null;
        }
    }

    static fromJS(data: any): Contents {
        return new Contents(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.labels && this.labels.constructor === Array) {
            data["labels"] = [];
            for (let item of this.labels)
                data["labels"].push(item);
        }
        data["read"] = this.read !== undefined ? this.read : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Contents(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource26 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response21 { 
    /** px128x128 string */
    px128x128?: string; 
    /** px256x256 string */
    px256x256?: string; 
    /** px512x512 string */
    px512x512?: string; 
    /** px64x64 string */
    px64x64?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.px128x128 = data["px128x128"] !== undefined ? data["px128x128"] : null;
            this.px256x256 = data["px256x256"] !== undefined ? data["px256x256"] : null;
            this.px512x512 = data["px512x512"] !== undefined ? data["px512x512"] : null;
            this.px64x64 = data["px64x64"] !== undefined ? data["px64x64"] : null;
        }
    }

    static fromJS(data: any): Response21 {
        return new Response21(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["px128x128"] = this.px128x128 !== undefined ? this.px128x128 : null;
        data["px256x256"] = this.px256x256 !== undefined ? this.px256x256 : null;
        data["px512x512"] = this.px512x512 !== undefined ? this.px512x512 : null;
        data["px64x64"] = this.px64x64 !== undefined ? this.px64x64 : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response21(JSON.parse(json));
    }
}

/** No image server for this datasource */
export class Exception51 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception51 {
        return new Exception51(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception51(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception52 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception52 {
        return new Exception52(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception52(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource27 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response22 { 
    /** agent array */
    agent?: number[]; 
    /** alliance array */
    alliance?: number[]; 
    /** character array */
    character?: number[]; 
    /** constellation array */
    constellation?: number[]; 
    /** corporation array */
    corporation?: number[]; 
    /** faction array */
    faction?: number[]; 
    /** inventorytype array */
    inventorytype?: number[]; 
    /** region array */
    region?: number[]; 
    /** solarsystem array */
    solarsystem?: number[]; 
    /** station array */
    station?: number[]; 
    /** structure array */
    structure?: number[]; 
    /** wormhole array */
    wormhole?: number[];

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["agent"] && data["agent"].constructor === Array) {
                this.agent = [];
                for (let item of data["agent"])
                    this.agent.push(item);
            }
            if (data["alliance"] && data["alliance"].constructor === Array) {
                this.alliance = [];
                for (let item of data["alliance"])
                    this.alliance.push(item);
            }
            if (data["character"] && data["character"].constructor === Array) {
                this.character = [];
                for (let item of data["character"])
                    this.character.push(item);
            }
            if (data["constellation"] && data["constellation"].constructor === Array) {
                this.constellation = [];
                for (let item of data["constellation"])
                    this.constellation.push(item);
            }
            if (data["corporation"] && data["corporation"].constructor === Array) {
                this.corporation = [];
                for (let item of data["corporation"])
                    this.corporation.push(item);
            }
            if (data["faction"] && data["faction"].constructor === Array) {
                this.faction = [];
                for (let item of data["faction"])
                    this.faction.push(item);
            }
            if (data["inventorytype"] && data["inventorytype"].constructor === Array) {
                this.inventorytype = [];
                for (let item of data["inventorytype"])
                    this.inventorytype.push(item);
            }
            if (data["region"] && data["region"].constructor === Array) {
                this.region = [];
                for (let item of data["region"])
                    this.region.push(item);
            }
            if (data["solarsystem"] && data["solarsystem"].constructor === Array) {
                this.solarsystem = [];
                for (let item of data["solarsystem"])
                    this.solarsystem.push(item);
            }
            if (data["station"] && data["station"].constructor === Array) {
                this.station = [];
                for (let item of data["station"])
                    this.station.push(item);
            }
            if (data["structure"] && data["structure"].constructor === Array) {
                this.structure = [];
                for (let item of data["structure"])
                    this.structure.push(item);
            }
            if (data["wormhole"] && data["wormhole"].constructor === Array) {
                this.wormhole = [];
                for (let item of data["wormhole"])
                    this.wormhole.push(item);
            }
        }
    }

    static fromJS(data: any): Response22 {
        return new Response22(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.agent && this.agent.constructor === Array) {
            data["agent"] = [];
            for (let item of this.agent)
                data["agent"].push(item);
        }
        if (this.alliance && this.alliance.constructor === Array) {
            data["alliance"] = [];
            for (let item of this.alliance)
                data["alliance"].push(item);
        }
        if (this.character && this.character.constructor === Array) {
            data["character"] = [];
            for (let item of this.character)
                data["character"].push(item);
        }
        if (this.constellation && this.constellation.constructor === Array) {
            data["constellation"] = [];
            for (let item of this.constellation)
                data["constellation"].push(item);
        }
        if (this.corporation && this.corporation.constructor === Array) {
            data["corporation"] = [];
            for (let item of this.corporation)
                data["corporation"].push(item);
        }
        if (this.faction && this.faction.constructor === Array) {
            data["faction"] = [];
            for (let item of this.faction)
                data["faction"].push(item);
        }
        if (this.inventorytype && this.inventorytype.constructor === Array) {
            data["inventorytype"] = [];
            for (let item of this.inventorytype)
                data["inventorytype"].push(item);
        }
        if (this.region && this.region.constructor === Array) {
            data["region"] = [];
            for (let item of this.region)
                data["region"].push(item);
        }
        if (this.solarsystem && this.solarsystem.constructor === Array) {
            data["solarsystem"] = [];
            for (let item of this.solarsystem)
                data["solarsystem"].push(item);
        }
        if (this.station && this.station.constructor === Array) {
            data["station"] = [];
            for (let item of this.station)
                data["station"].push(item);
        }
        if (this.structure && this.structure.constructor === Array) {
            data["structure"] = [];
            for (let item of this.structure)
                data["structure"].push(item);
        }
        if (this.wormhole && this.wormhole.constructor === Array) {
            data["wormhole"] = [];
            for (let item of this.wormhole)
                data["wormhole"].push(item);
        }
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response22(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception53 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception53 {
        return new Exception53(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception53(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception54 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception54 {
        return new Exception54(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception54(JSON.parse(json));
    }
}

export enum Categories {
    Agent = <any>"agent", 
    Alliance = <any>"alliance", 
    Character = <any>"character", 
    Constellation = <any>"constellation", 
    Corporation = <any>"corporation", 
    Faction = <any>"faction", 
    Inventorytype = <any>"inventorytype", 
    Region = <any>"region", 
    Solarsystem = <any>"solarsystem", 
    Station = <any>"station", 
    Structure = <any>"structure", 
    Wormhole = <any>"wormhole", 
}

/** Search locale */
export enum Language {
    EnUs = <any>"en-us", 
    De = <any>"de", 
    Fr = <any>"fr", 
    Ru = <any>"ru", 
    Ja = <any>"ja", 
    Zh = <any>"zh", 
}

/** The server name you would like data from */
export enum Datasource28 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response23 { 
    /** Item id's are unique to a ship and persist until it is repackaged. This value can be used to track repeated uses of a ship, or detect when a pilot changes into a different instance of the same ship type. */
    ship_item_id: number; 
    /** ship_name string */
    ship_name: string; 
    /** ship_type_id integer */
    ship_type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.ship_item_id = data["ship_item_id"] !== undefined ? data["ship_item_id"] : null;
            this.ship_name = data["ship_name"] !== undefined ? data["ship_name"] : null;
            this.ship_type_id = data["ship_type_id"] !== undefined ? data["ship_type_id"] : null;
        }
    }

    static fromJS(data: any): Response23 {
        return new Response23(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["ship_item_id"] = this.ship_item_id !== undefined ? this.ship_item_id : null;
        data["ship_name"] = this.ship_name !== undefined ? this.ship_name : null;
        data["ship_type_id"] = this.ship_type_id !== undefined ? this.ship_type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response23(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception55 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception55 {
        return new Exception55(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception55(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception56 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception56 {
        return new Exception56(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception56(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource29 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response24 { 
    /** finish_date string */
    finish_date?: Date; 
    /** finished_level integer */
    finished_level: number; 
    /** level_end_sp integer */
    level_end_sp?: number; 
    /** Amount of SP that was in the skill when it started training it's current level. Used to calculate % of current level complete. */
    level_start_sp?: number; 
    /** queue_position integer */
    queue_position: number; 
    /** skill_id integer */
    skill_id: number; 
    /** start_date string */
    start_date?: Date; 
    /** training_start_sp integer */
    training_start_sp?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.finish_date = data["finish_date"] ? new Date(data["finish_date"].toString()) : null;
            this.finished_level = data["finished_level"] !== undefined ? data["finished_level"] : null;
            this.level_end_sp = data["level_end_sp"] !== undefined ? data["level_end_sp"] : null;
            this.level_start_sp = data["level_start_sp"] !== undefined ? data["level_start_sp"] : null;
            this.queue_position = data["queue_position"] !== undefined ? data["queue_position"] : null;
            this.skill_id = data["skill_id"] !== undefined ? data["skill_id"] : null;
            this.start_date = data["start_date"] ? new Date(data["start_date"].toString()) : null;
            this.training_start_sp = data["training_start_sp"] !== undefined ? data["training_start_sp"] : null;
        }
    }

    static fromJS(data: any): Response24 {
        return new Response24(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["finish_date"] = this.finish_date ? this.finish_date.toISOString() : null;
        data["finished_level"] = this.finished_level !== undefined ? this.finished_level : null;
        data["level_end_sp"] = this.level_end_sp !== undefined ? this.level_end_sp : null;
        data["level_start_sp"] = this.level_start_sp !== undefined ? this.level_start_sp : null;
        data["queue_position"] = this.queue_position !== undefined ? this.queue_position : null;
        data["skill_id"] = this.skill_id !== undefined ? this.skill_id : null;
        data["start_date"] = this.start_date ? this.start_date.toISOString() : null;
        data["training_start_sp"] = this.training_start_sp !== undefined ? this.training_start_sp : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response24(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception57 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception57 {
        return new Exception57(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception57(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception58 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception58 {
        return new Exception58(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception58(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource30 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response25 { 
    /** skills array */
    skills?: Skills[]; 
    /** total_sp integer */
    total_sp?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["skills"] && data["skills"].constructor === Array) {
                this.skills = [];
                for (let item of data["skills"])
                    this.skills.push(Skills.fromJS(item));
            }
            this.total_sp = data["total_sp"] !== undefined ? data["total_sp"] : null;
        }
    }

    static fromJS(data: any): Response25 {
        return new Response25(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.skills && this.skills.constructor === Array) {
            data["skills"] = [];
            for (let item of this.skills)
                data["skills"].push(item.toJS());
        }
        data["total_sp"] = this.total_sp !== undefined ? this.total_sp : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response25(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception59 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception59 {
        return new Exception59(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception59(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception60 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception60 {
        return new Exception60(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception60(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource31 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response26 { 
    /** Wallet's balance in ISK hundredths. */
    balance?: number; 
    /** wallet_id integer */
    wallet_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.balance = data["balance"] !== undefined ? data["balance"] : null;
            this.wallet_id = data["wallet_id"] !== undefined ? data["wallet_id"] : null;
        }
    }

    static fromJS(data: any): Response26 {
        return new Response26(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["balance"] = this.balance !== undefined ? this.balance : null;
        data["wallet_id"] = this.wallet_id !== undefined ? this.wallet_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response26(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception61 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception61 {
        return new Exception61(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception61(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception62 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception62 {
        return new Exception62(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception62(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource32 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response27 { 
    /** corporation_id integer */
    corporation_id: number; 
    /** corporation_name string */
    corporation_name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.corporation_name = data["corporation_name"] !== undefined ? data["corporation_name"] : null;
        }
    }

    static fromJS(data: any): Response27 {
        return new Response27(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["corporation_name"] = this.corporation_name !== undefined ? this.corporation_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response27(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception63 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception63 {
        return new Exception63(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception63(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource33 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response28 { 
    /** id of alliance that corporation is a member of, if any */
    alliance_id?: number; 
    /** ceo_id integer */
    ceo_id: number; 
    /** the full name of the corporation */
    corporation_name: string; 
    /** member_count integer */
    member_count: number; 
    /** the short name of the corporation */
    ticker: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.ceo_id = data["ceo_id"] !== undefined ? data["ceo_id"] : null;
            this.corporation_name = data["corporation_name"] !== undefined ? data["corporation_name"] : null;
            this.member_count = data["member_count"] !== undefined ? data["member_count"] : null;
            this.ticker = data["ticker"] !== undefined ? data["ticker"] : null;
        }
    }

    static fromJS(data: any): Response28 {
        return new Response28(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["ceo_id"] = this.ceo_id !== undefined ? this.ceo_id : null;
        data["corporation_name"] = this.corporation_name !== undefined ? this.corporation_name : null;
        data["member_count"] = this.member_count !== undefined ? this.member_count : null;
        data["ticker"] = this.ticker !== undefined ? this.ticker : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response28(JSON.parse(json));
    }
}

/** Not found */
export class Exception64 { 
    /** Not found message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception64 {
        return new Exception64(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception64(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception65 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception65 {
        return new Exception65(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception65(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource34 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response29 { 
    /** alliance object */
    alliance?: Alliance; 
    /** An incrementing ID that can be used to canonically establish order of records in cases where dates may be ambiguous */
    record_id: number; 
    /** start_date string */
    start_date: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance = data["alliance"] ? Alliance.fromJS(data["alliance"]) : null;
            this.record_id = data["record_id"] !== undefined ? data["record_id"] : null;
            this.start_date = data["start_date"] ? new Date(data["start_date"].toString()) : null;
        }
    }

    static fromJS(data: any): Response29 {
        return new Response29(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance"] = this.alliance ? this.alliance.toJS() : null;
        data["record_id"] = this.record_id !== undefined ? this.record_id : null;
        data["start_date"] = this.start_date ? this.start_date.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response29(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception66 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception66 {
        return new Exception66(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception66(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource35 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response30 { 
    /** px128x128 string */
    px128x128?: string; 
    /** px256x256 string */
    px256x256?: string; 
    /** px64x64 string */
    px64x64?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.px128x128 = data["px128x128"] !== undefined ? data["px128x128"] : null;
            this.px256x256 = data["px256x256"] !== undefined ? data["px256x256"] : null;
            this.px64x64 = data["px64x64"] !== undefined ? data["px64x64"] : null;
        }
    }

    static fromJS(data: any): Response30 {
        return new Response30(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["px128x128"] = this.px128x128 !== undefined ? this.px128x128 : null;
        data["px256x256"] = this.px256x256 !== undefined ? this.px256x256 : null;
        data["px64x64"] = this.px64x64 !== undefined ? this.px64x64 : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response30(JSON.parse(json));
    }
}

/** No image server for this datasource */
export class Exception67 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception67 {
        return new Exception67(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception67(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception68 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception68 {
        return new Exception68(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception68(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource36 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response31 { 
    /** character_id integer */
    character_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.character_id = data["character_id"] !== undefined ? data["character_id"] : null;
        }
    }

    static fromJS(data: any): Response31 {
        return new Response31(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["character_id"] = this.character_id !== undefined ? this.character_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response31(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception69 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception69 {
        return new Exception69(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception69(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception70 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception70 {
        return new Exception70(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception70(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource37 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response32 { 
    /** character_id integer */
    character_id: number; 
    /** grantable_roles array */
    grantable_roles?: Grantable_roles[]; 
    /** grantable_roles_at_base array */
    grantable_roles_at_base?: Grantable_roles_at_base[]; 
    /** grantable_roles_at_hq array */
    grantable_roles_at_hq?: Grantable_roles_at_hq[]; 
    /** grantable_roles_at_other array */
    grantable_roles_at_other?: Grantable_roles_at_other[]; 
    /** roles array */
    roles?: Roles[]; 
    /** roles_at_base array */
    roles_at_base?: Roles_at_base[]; 
    /** roles_at_hq array */
    roles_at_hq?: Roles_at_hq[]; 
    /** roles_at_other array */
    roles_at_other?: Roles_at_other[];

    constructor(data?: any) {
        if (data !== undefined) {
            this.character_id = data["character_id"] !== undefined ? data["character_id"] : null;
            if (data["grantable_roles"] && data["grantable_roles"].constructor === Array) {
                this.grantable_roles = [];
                for (let item of data["grantable_roles"])
                    this.grantable_roles.push(item);
            }
            if (data["grantable_roles_at_base"] && data["grantable_roles_at_base"].constructor === Array) {
                this.grantable_roles_at_base = [];
                for (let item of data["grantable_roles_at_base"])
                    this.grantable_roles_at_base.push(item);
            }
            if (data["grantable_roles_at_hq"] && data["grantable_roles_at_hq"].constructor === Array) {
                this.grantable_roles_at_hq = [];
                for (let item of data["grantable_roles_at_hq"])
                    this.grantable_roles_at_hq.push(item);
            }
            if (data["grantable_roles_at_other"] && data["grantable_roles_at_other"].constructor === Array) {
                this.grantable_roles_at_other = [];
                for (let item of data["grantable_roles_at_other"])
                    this.grantable_roles_at_other.push(item);
            }
            if (data["roles"] && data["roles"].constructor === Array) {
                this.roles = [];
                for (let item of data["roles"])
                    this.roles.push(item);
            }
            if (data["roles_at_base"] && data["roles_at_base"].constructor === Array) {
                this.roles_at_base = [];
                for (let item of data["roles_at_base"])
                    this.roles_at_base.push(item);
            }
            if (data["roles_at_hq"] && data["roles_at_hq"].constructor === Array) {
                this.roles_at_hq = [];
                for (let item of data["roles_at_hq"])
                    this.roles_at_hq.push(item);
            }
            if (data["roles_at_other"] && data["roles_at_other"].constructor === Array) {
                this.roles_at_other = [];
                for (let item of data["roles_at_other"])
                    this.roles_at_other.push(item);
            }
        }
    }

    static fromJS(data: any): Response32 {
        return new Response32(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["character_id"] = this.character_id !== undefined ? this.character_id : null;
        if (this.grantable_roles && this.grantable_roles.constructor === Array) {
            data["grantable_roles"] = [];
            for (let item of this.grantable_roles)
                data["grantable_roles"].push(item);
        }
        if (this.grantable_roles_at_base && this.grantable_roles_at_base.constructor === Array) {
            data["grantable_roles_at_base"] = [];
            for (let item of this.grantable_roles_at_base)
                data["grantable_roles_at_base"].push(item);
        }
        if (this.grantable_roles_at_hq && this.grantable_roles_at_hq.constructor === Array) {
            data["grantable_roles_at_hq"] = [];
            for (let item of this.grantable_roles_at_hq)
                data["grantable_roles_at_hq"].push(item);
        }
        if (this.grantable_roles_at_other && this.grantable_roles_at_other.constructor === Array) {
            data["grantable_roles_at_other"] = [];
            for (let item of this.grantable_roles_at_other)
                data["grantable_roles_at_other"].push(item);
        }
        if (this.roles && this.roles.constructor === Array) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item);
        }
        if (this.roles_at_base && this.roles_at_base.constructor === Array) {
            data["roles_at_base"] = [];
            for (let item of this.roles_at_base)
                data["roles_at_base"].push(item);
        }
        if (this.roles_at_hq && this.roles_at_hq.constructor === Array) {
            data["roles_at_hq"] = [];
            for (let item of this.roles_at_hq)
                data["roles_at_hq"].push(item);
        }
        if (this.roles_at_other && this.roles_at_other.constructor === Array) {
            data["roles_at_other"] = [];
            for (let item of this.roles_at_other)
                data["roles_at_other"].push(item);
        }
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response32(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception71 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception71 {
        return new Exception71(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception71(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception72 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception72 {
        return new Exception72(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception72(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource38 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response33 { 
    /** The constellation id in which this incursion takes place */
    constellation_id: number; 
    /** The attacking faction's id */
    faction_id: number; 
    /** Whether the final encounter has boss or not */
    has_boss: boolean; 
    /** A list of infested solar system ids that are a part of this incursion */
    infested_solar_systems: number[] = []; 
    /** Influence of this incursion as a float from 0 to 1 */
    influence: number; 
    /** Staging solar system for this incursion */
    staging_solar_system_id: number; 
    /** The state of this incursion */
    state: Response33State; 
    /** The type of this incursion */
    type: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.constellation_id = data["constellation_id"] !== undefined ? data["constellation_id"] : null;
            this.faction_id = data["faction_id"] !== undefined ? data["faction_id"] : null;
            this.has_boss = data["has_boss"] !== undefined ? data["has_boss"] : null;
            if (data["infested_solar_systems"] && data["infested_solar_systems"].constructor === Array) {
                this.infested_solar_systems = [];
                for (let item of data["infested_solar_systems"])
                    this.infested_solar_systems.push(item);
            }
            this.influence = data["influence"] !== undefined ? data["influence"] : null;
            this.staging_solar_system_id = data["staging_solar_system_id"] !== undefined ? data["staging_solar_system_id"] : null;
            this.state = data["state"] !== undefined ? data["state"] : null;
            this.type = data["type"] !== undefined ? data["type"] : null;
        }
    }

    static fromJS(data: any): Response33 {
        return new Response33(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["constellation_id"] = this.constellation_id !== undefined ? this.constellation_id : null;
        data["faction_id"] = this.faction_id !== undefined ? this.faction_id : null;
        data["has_boss"] = this.has_boss !== undefined ? this.has_boss : null;
        if (this.infested_solar_systems && this.infested_solar_systems.constructor === Array) {
            data["infested_solar_systems"] = [];
            for (let item of this.infested_solar_systems)
                data["infested_solar_systems"].push(item);
        }
        data["influence"] = this.influence !== undefined ? this.influence : null;
        data["staging_solar_system_id"] = this.staging_solar_system_id !== undefined ? this.staging_solar_system_id : null;
        data["state"] = this.state !== undefined ? this.state : null;
        data["type"] = this.type !== undefined ? this.type : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response33(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception73 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception73 {
        return new Exception73(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception73(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource39 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response34 { 
    /** A list of a available insurance levels for this ship type */
    levels: Levels[] = []; 
    /** type_id integer */
    type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["levels"] && data["levels"].constructor === Array) {
                this.levels = [];
                for (let item of data["levels"])
                    this.levels.push(Levels.fromJS(item));
            }
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
        }
    }

    static fromJS(data: any): Response34 {
        return new Response34(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.levels && this.levels.constructor === Array) {
            data["levels"] = [];
            for (let item of this.levels)
                data["levels"].push(item.toJS());
        }
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response34(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception74 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception74 {
        return new Exception74(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception74(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource40 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response35 { 
    /** attackers array */
    attackers: Attackers[] = []; 
    /** ID of the killmail */
    killmail_id: number; 
    /** Time that the victim was killed and the killmail generated
 */
    killmail_time: Date; 
    /** Moon if the kill took place at one */
    moon_id?: number; 
    /** Solar system that the kill took place in
 */
    solar_system_id: number; 
    /** victim object */
    victim: Victim = new Victim(); 
    /** War if the killmail is generated in relation to an official war
 */
    war_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["attackers"] && data["attackers"].constructor === Array) {
                this.attackers = [];
                for (let item of data["attackers"])
                    this.attackers.push(Attackers.fromJS(item));
            }
            this.killmail_id = data["killmail_id"] !== undefined ? data["killmail_id"] : null;
            this.killmail_time = data["killmail_time"] ? new Date(data["killmail_time"].toString()) : null;
            this.moon_id = data["moon_id"] !== undefined ? data["moon_id"] : null;
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.victim = data["victim"] ? Victim.fromJS(data["victim"]) : new Victim();
            this.war_id = data["war_id"] !== undefined ? data["war_id"] : null;
        }
    }

    static fromJS(data: any): Response35 {
        return new Response35(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.attackers && this.attackers.constructor === Array) {
            data["attackers"] = [];
            for (let item of this.attackers)
                data["attackers"].push(item.toJS());
        }
        data["killmail_id"] = this.killmail_id !== undefined ? this.killmail_id : null;
        data["killmail_time"] = this.killmail_time ? this.killmail_time.toISOString() : null;
        data["moon_id"] = this.moon_id !== undefined ? this.moon_id : null;
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["victim"] = this.victim ? this.victim.toJS() : null;
        data["war_id"] = this.war_id !== undefined ? this.war_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response35(JSON.parse(json));
    }
}

/** killmail_id and/or killmail_hash is not valid */
export class Exception75 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception75 {
        return new Exception75(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception75(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception76 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception76 {
        return new Exception76(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception76(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource41 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response36 { 
    /** adjusted_price number */
    adjusted_price?: number; 
    /** average_price number */
    average_price?: number; 
    /** type_id integer */
    type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.adjusted_price = data["adjusted_price"] !== undefined ? data["adjusted_price"] : null;
            this.average_price = data["average_price"] !== undefined ? data["average_price"] : null;
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
        }
    }

    static fromJS(data: any): Response36 {
        return new Response36(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["adjusted_price"] = this.adjusted_price !== undefined ? this.adjusted_price : null;
        data["average_price"] = this.average_price !== undefined ? this.average_price : null;
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response36(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception77 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception77 {
        return new Exception77(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception77(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource42 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response37 { 
    /** average number */
    average: number; 
    /** The date of this historical statistic entry */
    date: Date; 
    /** highest number */
    highest: number; 
    /** lowest number */
    lowest: number; 
    /** Total number of orders happened that day */
    order_count: number; 
    /** Total */
    volume: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.average = data["average"] !== undefined ? data["average"] : null;
            this.date = data["date"] ? new Date(data["date"].toString()) : null;
            this.highest = data["highest"] !== undefined ? data["highest"] : null;
            this.lowest = data["lowest"] !== undefined ? data["lowest"] : null;
            this.order_count = data["order_count"] !== undefined ? data["order_count"] : null;
            this.volume = data["volume"] !== undefined ? data["volume"] : null;
        }
    }

    static fromJS(data: any): Response37 {
        return new Response37(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["average"] = this.average !== undefined ? this.average : null;
        data["date"] = this.date ? this.date.toISOString() : null;
        data["highest"] = this.highest !== undefined ? this.highest : null;
        data["lowest"] = this.lowest !== undefined ? this.lowest : null;
        data["order_count"] = this.order_count !== undefined ? this.order_count : null;
        data["volume"] = this.volume !== undefined ? this.volume : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response37(JSON.parse(json));
    }
}

/** bad region_id */
export class Exception78 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception78 {
        return new Exception78(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception78(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception79 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception79 {
        return new Exception79(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception79(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource43 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response38 { 
    /** duration integer */
    duration: number; 
    /** is_buy_order boolean */
    is_buy_order: boolean; 
    /** issued string */
    issued: Date; 
    /** location_id integer */
    location_id: number; 
    /** min_volume integer */
    min_volume: number; 
    /** order_id integer */
    order_id: number; 
    /** price number */
    price: number; 
    /** range string */
    range: Response38Range; 
    /** type_id integer */
    type_id: number; 
    /** volume_remain integer */
    volume_remain: number; 
    /** volume_total integer */
    volume_total: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.duration = data["duration"] !== undefined ? data["duration"] : null;
            this.is_buy_order = data["is_buy_order"] !== undefined ? data["is_buy_order"] : null;
            this.issued = data["issued"] ? new Date(data["issued"].toString()) : null;
            this.location_id = data["location_id"] !== undefined ? data["location_id"] : null;
            this.min_volume = data["min_volume"] !== undefined ? data["min_volume"] : null;
            this.order_id = data["order_id"] !== undefined ? data["order_id"] : null;
            this.price = data["price"] !== undefined ? data["price"] : null;
            this.range = data["range"] !== undefined ? data["range"] : null;
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
            this.volume_remain = data["volume_remain"] !== undefined ? data["volume_remain"] : null;
            this.volume_total = data["volume_total"] !== undefined ? data["volume_total"] : null;
        }
    }

    static fromJS(data: any): Response38 {
        return new Response38(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["duration"] = this.duration !== undefined ? this.duration : null;
        data["is_buy_order"] = this.is_buy_order !== undefined ? this.is_buy_order : null;
        data["issued"] = this.issued ? this.issued.toISOString() : null;
        data["location_id"] = this.location_id !== undefined ? this.location_id : null;
        data["min_volume"] = this.min_volume !== undefined ? this.min_volume : null;
        data["order_id"] = this.order_id !== undefined ? this.order_id : null;
        data["price"] = this.price !== undefined ? this.price : null;
        data["range"] = this.range !== undefined ? this.range : null;
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        data["volume_remain"] = this.volume_remain !== undefined ? this.volume_remain : null;
        data["volume_total"] = this.volume_total !== undefined ? this.volume_total : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response38(JSON.parse(json));
    }
}

/** bad region_id */
export class Exception80 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception80 {
        return new Exception80(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception80(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception81 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception81 {
        return new Exception81(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception81(JSON.parse(json));
    }
}

/** Filter buy/sell orders, return all orders by default. If you query without type_id, we always return both buy and sell orders. */
export enum Order_type {
    Buy = <any>"buy", 
    Sell = <any>"sell", 
    All = <any>"all", 
}

/** The server name you would like data from */
export enum Datasource44 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response39 { 
    /** agent array */
    agent?: number[]; 
    /** alliance array */
    alliance?: number[]; 
    /** character array */
    character?: number[]; 
    /** constellation array */
    constellation?: number[]; 
    /** corporation array */
    corporation?: number[]; 
    /** faction array */
    faction?: number[]; 
    /** inventorytype array */
    inventorytype?: number[]; 
    /** region array */
    region?: number[]; 
    /** solarsystem array */
    solarsystem?: number[]; 
    /** station array */
    station?: number[]; 
    /** wormhole array */
    wormhole?: number[];

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["agent"] && data["agent"].constructor === Array) {
                this.agent = [];
                for (let item of data["agent"])
                    this.agent.push(item);
            }
            if (data["alliance"] && data["alliance"].constructor === Array) {
                this.alliance = [];
                for (let item of data["alliance"])
                    this.alliance.push(item);
            }
            if (data["character"] && data["character"].constructor === Array) {
                this.character = [];
                for (let item of data["character"])
                    this.character.push(item);
            }
            if (data["constellation"] && data["constellation"].constructor === Array) {
                this.constellation = [];
                for (let item of data["constellation"])
                    this.constellation.push(item);
            }
            if (data["corporation"] && data["corporation"].constructor === Array) {
                this.corporation = [];
                for (let item of data["corporation"])
                    this.corporation.push(item);
            }
            if (data["faction"] && data["faction"].constructor === Array) {
                this.faction = [];
                for (let item of data["faction"])
                    this.faction.push(item);
            }
            if (data["inventorytype"] && data["inventorytype"].constructor === Array) {
                this.inventorytype = [];
                for (let item of data["inventorytype"])
                    this.inventorytype.push(item);
            }
            if (data["region"] && data["region"].constructor === Array) {
                this.region = [];
                for (let item of data["region"])
                    this.region.push(item);
            }
            if (data["solarsystem"] && data["solarsystem"].constructor === Array) {
                this.solarsystem = [];
                for (let item of data["solarsystem"])
                    this.solarsystem.push(item);
            }
            if (data["station"] && data["station"].constructor === Array) {
                this.station = [];
                for (let item of data["station"])
                    this.station.push(item);
            }
            if (data["wormhole"] && data["wormhole"].constructor === Array) {
                this.wormhole = [];
                for (let item of data["wormhole"])
                    this.wormhole.push(item);
            }
        }
    }

    static fromJS(data: any): Response39 {
        return new Response39(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.agent && this.agent.constructor === Array) {
            data["agent"] = [];
            for (let item of this.agent)
                data["agent"].push(item);
        }
        if (this.alliance && this.alliance.constructor === Array) {
            data["alliance"] = [];
            for (let item of this.alliance)
                data["alliance"].push(item);
        }
        if (this.character && this.character.constructor === Array) {
            data["character"] = [];
            for (let item of this.character)
                data["character"].push(item);
        }
        if (this.constellation && this.constellation.constructor === Array) {
            data["constellation"] = [];
            for (let item of this.constellation)
                data["constellation"].push(item);
        }
        if (this.corporation && this.corporation.constructor === Array) {
            data["corporation"] = [];
            for (let item of this.corporation)
                data["corporation"].push(item);
        }
        if (this.faction && this.faction.constructor === Array) {
            data["faction"] = [];
            for (let item of this.faction)
                data["faction"].push(item);
        }
        if (this.inventorytype && this.inventorytype.constructor === Array) {
            data["inventorytype"] = [];
            for (let item of this.inventorytype)
                data["inventorytype"].push(item);
        }
        if (this.region && this.region.constructor === Array) {
            data["region"] = [];
            for (let item of this.region)
                data["region"].push(item);
        }
        if (this.solarsystem && this.solarsystem.constructor === Array) {
            data["solarsystem"] = [];
            for (let item of this.solarsystem)
                data["solarsystem"].push(item);
        }
        if (this.station && this.station.constructor === Array) {
            data["station"] = [];
            for (let item of this.station)
                data["station"].push(item);
        }
        if (this.wormhole && this.wormhole.constructor === Array) {
            data["wormhole"] = [];
            for (let item of this.wormhole)
                data["wormhole"].push(item);
        }
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response39(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception82 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception82 {
        return new Exception82(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception82(JSON.parse(json));
    }
}

export enum Categories2 {
    Agent = <any>"agent", 
    Alliance = <any>"alliance", 
    Character = <any>"character", 
    Constellation = <any>"constellation", 
    Corporation = <any>"corporation", 
    Faction = <any>"faction", 
    Inventorytype = <any>"inventorytype", 
    Region = <any>"region", 
    Solarsystem = <any>"solarsystem", 
    Station = <any>"station", 
    Wormhole = <any>"wormhole", 
}

/** Search locale */
export enum Language2 {
    EnUs = <any>"en-us", 
    De = <any>"de", 
    Fr = <any>"fr", 
    Ru = <any>"ru", 
    Ja = <any>"ja", 
    Zh = <any>"zh", 
}

/** The server name you would like data from */
export enum Datasource45 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response40 { 
    /** Score for all attacking parties, only present in Defense Events.
 */
    attackers_score?: number; 
    /** Unique ID for this campaign. */
    campaign_id: number; 
    /** The constellation in which the campaign will take place.
 */
    constellation_id: number; 
    /** Defending alliance, only present in Defense Events
 */
    defender_id?: number; 
    /** Score for the defending alliance, only present in Defense Events.
 */
    defender_score?: number; 
    /** Type of event this campaign is for. tcu_defense, ihub_defense and station_defense are referred to as "Defense Events", station_freeport as "Freeport Events".
 */
    event_type: Response40Event_type; 
    /** Alliance participating and their respective scores, only present in Freeport Events.
 */
    participants?: Participants[]; 
    /** The solar system the structure is located in.
 */
    solar_system_id: number; 
    /** Time the event is scheduled to start.
 */
    start_time: Date; 
    /** The structure item ID that is related to this campaign.
 */
    structure_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.attackers_score = data["attackers_score"] !== undefined ? data["attackers_score"] : null;
            this.campaign_id = data["campaign_id"] !== undefined ? data["campaign_id"] : null;
            this.constellation_id = data["constellation_id"] !== undefined ? data["constellation_id"] : null;
            this.defender_id = data["defender_id"] !== undefined ? data["defender_id"] : null;
            this.defender_score = data["defender_score"] !== undefined ? data["defender_score"] : null;
            this.event_type = data["event_type"] !== undefined ? data["event_type"] : null;
            if (data["participants"] && data["participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["participants"])
                    this.participants.push(Participants.fromJS(item));
            }
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.start_time = data["start_time"] ? new Date(data["start_time"].toString()) : null;
            this.structure_id = data["structure_id"] !== undefined ? data["structure_id"] : null;
        }
    }

    static fromJS(data: any): Response40 {
        return new Response40(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["attackers_score"] = this.attackers_score !== undefined ? this.attackers_score : null;
        data["campaign_id"] = this.campaign_id !== undefined ? this.campaign_id : null;
        data["constellation_id"] = this.constellation_id !== undefined ? this.constellation_id : null;
        data["defender_id"] = this.defender_id !== undefined ? this.defender_id : null;
        data["defender_score"] = this.defender_score !== undefined ? this.defender_score : null;
        data["event_type"] = this.event_type !== undefined ? this.event_type : null;
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJS());
        }
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["start_time"] = this.start_time ? this.start_time.toISOString() : null;
        data["structure_id"] = this.structure_id !== undefined ? this.structure_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response40(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception83 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception83 {
        return new Exception83(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception83(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource46 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response41 { 
    /** The alliance that owns the structure.
 */
    alliance_id: number; 
    /** Solar system in which the structure is located.
 */
    solar_system_id: number; 
    /** Unique item ID for this structure. */
    structure_id: number; 
    /** A reference to the type of structure this is.
 */
    structure_type_id: number; 
    /** The occupancy level for the next or current vulnerability window. This takes into account all development indexes and capital system bonuses. Also known as Activity Defense Multiplier from in the client. It increases the time that attackers must spend using their entosis links on the structure.
 */
    vulnerability_occupancy_level?: number; 
    /** The time at which the next or current vulnerability window ends. At the end of a vulnerability window the next window is recalculated and locked in along with the vulnerabilityOccupancyLevel. If the structure is not in 100% entosis control of the defender, it will go in to 'overtime' and stay vulnerable for as long as that situation persists. Only once the defenders have 100% entosis control and has the vulnerableEndTime passed does the vulnerability interval expire and a new one is calculated.
 */
    vulnerable_end_time?: Date; 
    /** The next time at which the structure will become vulnerable. Or the start time of the current window if current time is between this and vulnerableEndTime.
 */
    vulnerable_start_time?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.structure_id = data["structure_id"] !== undefined ? data["structure_id"] : null;
            this.structure_type_id = data["structure_type_id"] !== undefined ? data["structure_type_id"] : null;
            this.vulnerability_occupancy_level = data["vulnerability_occupancy_level"] !== undefined ? data["vulnerability_occupancy_level"] : null;
            this.vulnerable_end_time = data["vulnerable_end_time"] ? new Date(data["vulnerable_end_time"].toString()) : null;
            this.vulnerable_start_time = data["vulnerable_start_time"] ? new Date(data["vulnerable_start_time"].toString()) : null;
        }
    }

    static fromJS(data: any): Response41 {
        return new Response41(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["structure_id"] = this.structure_id !== undefined ? this.structure_id : null;
        data["structure_type_id"] = this.structure_type_id !== undefined ? this.structure_type_id : null;
        data["vulnerability_occupancy_level"] = this.vulnerability_occupancy_level !== undefined ? this.vulnerability_occupancy_level : null;
        data["vulnerable_end_time"] = this.vulnerable_end_time ? this.vulnerable_end_time.toISOString() : null;
        data["vulnerable_start_time"] = this.vulnerable_start_time ? this.vulnerable_start_time.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response41(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception84 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception84 {
        return new Exception84(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception84(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource47 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response42 { 
    /** category string */
    category: Response42Category; 
    /** id integer */
    id: number; 
    /** name string */
    name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.category = data["category"] !== undefined ? data["category"] : null;
            this.id = data["id"] !== undefined ? data["id"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
        }
    }

    static fromJS(data: any): Response42 {
        return new Response42(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["category"] = this.category !== undefined ? this.category : null;
        data["id"] = this.id !== undefined ? this.id : null;
        data["name"] = this.name !== undefined ? this.name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response42(JSON.parse(json));
    }
}

/** Not found */
export class Exception85 { 
    /** Not found message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception85 {
        return new Exception85(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception85(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception86 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception86 {
        return new Exception86(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception86(JSON.parse(json));
    }
}

/** ids schema */
export class Ids { 
    /** ids array */
    ids: number[] = [];

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["ids"] && data["ids"].constructor === Array) {
                this.ids = [];
                for (let item of data["ids"])
                    this.ids.push(item);
            }
        }
    }

    static fromJS(data: any): Ids {
        return new Ids(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.ids && this.ids.constructor === Array) {
            data["ids"] = [];
            for (let item of this.ids)
                data["ids"].push(item);
        }
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Ids(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource48 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response43 { 
    /** solar_system_id integer */
    solar_system_id?: number; 
    /** the full name of the station */
    station_name?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.station_name = data["station_name"] !== undefined ? data["station_name"] : null;
        }
    }

    static fromJS(data: any): Response43 {
        return new Response43(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["station_name"] = this.station_name !== undefined ? this.station_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response43(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception87 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception87 {
        return new Exception87(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception87(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource49 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Internal server error */
export class Exception88 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception88 {
        return new Exception88(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception88(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource50 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response44 { 
    /** The full name of the structure */
    name: string; 
    /** Coordinates of the structure in Cartesian space relative to the Sun, in metres.
 */
    position?: Position; 
    /** solar_system_id integer */
    solar_system_id: number; 
    /** type_id integer */
    type_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.name = data["name"] !== undefined ? data["name"] : null;
            this.position = data["position"] ? Position.fromJS(data["position"]) : null;
            this.solar_system_id = data["solar_system_id"] !== undefined ? data["solar_system_id"] : null;
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
        }
    }

    static fromJS(data: any): Response44 {
        return new Response44(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["name"] = this.name !== undefined ? this.name : null;
        data["position"] = this.position ? this.position.toJS() : null;
        data["solar_system_id"] = this.solar_system_id !== undefined ? this.solar_system_id : null;
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response44(JSON.parse(json));
    }
}

/** Forbidden */
export class Exception89 { 
    /** Forbidden message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception89 {
        return new Exception89(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception89(JSON.parse(json));
    }
}

/** Not found */
export class Exception90 { 
    /** Not found message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception90 {
        return new Exception90(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception90(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception91 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception91 {
        return new Exception91(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception91(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource51 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response45 { 
    /** the full name of the system */
    solar_system_name?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.solar_system_name = data["solar_system_name"] !== undefined ? data["solar_system_name"] : null;
        }
    }

    static fromJS(data: any): Response45 {
        return new Response45(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["solar_system_name"] = this.solar_system_name !== undefined ? this.solar_system_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response45(JSON.parse(json));
    }
}

/** System not found */
export class Exception92 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception92 {
        return new Exception92(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception92(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception93 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception93 {
        return new Exception93(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception93(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource52 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response46 { 
    /** category_id integer */
    category_id: number; 
    /** graphic_id integer */
    graphic_id?: number; 
    /** group_id integer */
    group_id: number; 
    /** icon_id integer */
    icon_id?: number; 
    /** type_description string */
    type_description: string; 
    /** type_name string */
    type_name: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.category_id = data["category_id"] !== undefined ? data["category_id"] : null;
            this.graphic_id = data["graphic_id"] !== undefined ? data["graphic_id"] : null;
            this.group_id = data["group_id"] !== undefined ? data["group_id"] : null;
            this.icon_id = data["icon_id"] !== undefined ? data["icon_id"] : null;
            this.type_description = data["type_description"] !== undefined ? data["type_description"] : null;
            this.type_name = data["type_name"] !== undefined ? data["type_name"] : null;
        }
    }

    static fromJS(data: any): Response46 {
        return new Response46(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["category_id"] = this.category_id !== undefined ? this.category_id : null;
        data["graphic_id"] = this.graphic_id !== undefined ? this.graphic_id : null;
        data["group_id"] = this.group_id !== undefined ? this.group_id : null;
        data["icon_id"] = this.icon_id !== undefined ? this.icon_id : null;
        data["type_description"] = this.type_description !== undefined ? this.type_description : null;
        data["type_name"] = this.type_name !== undefined ? this.type_name : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response46(JSON.parse(json));
    }
}

/** Type not found */
export class Exception94 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception94 {
        return new Exception94(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception94(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception95 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception95 {
        return new Exception95(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception95(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource53 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** Internal server error */
export class Exception96 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception96 {
        return new Exception96(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception96(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource54 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response47 { 
    /** The aggressor corporation or alliance that declared this war, only contains either corporation_id or alliance_id */
    aggressor: Aggressor = new Aggressor(); 
    /** allied corporations or alliances, each object contains either corporation_id or alliance_id */
    allies?: Allies[]; 
    /** Time that the war was declared */
    declared: Date; 
    /** The defending corporation or alliance that declared this war, only contains either corporation_id or alliance_id */
    defender: Defender = new Defender(); 
    /** Time the war ended and shooting was no longer allowed */
    finished?: Date; 
    /** ID of the specified war */
    id: number; 
    /** Was the war declared mutual by both parties */
    mutual: boolean; 
    /** Is the war currently open for allies or not */
    open_for_allies: boolean; 
    /** Time the war was retracted but both sides could still shoot each other */
    retracted?: Date; 
    /** Time when the war started and both sides could shoot each other */
    started?: Date;

    constructor(data?: any) {
        if (data !== undefined) {
            this.aggressor = data["aggressor"] ? Aggressor.fromJS(data["aggressor"]) : new Aggressor();
            if (data["allies"] && data["allies"].constructor === Array) {
                this.allies = [];
                for (let item of data["allies"])
                    this.allies.push(Allies.fromJS(item));
            }
            this.declared = data["declared"] ? new Date(data["declared"].toString()) : null;
            this.defender = data["defender"] ? Defender.fromJS(data["defender"]) : new Defender();
            this.finished = data["finished"] ? new Date(data["finished"].toString()) : null;
            this.id = data["id"] !== undefined ? data["id"] : null;
            this.mutual = data["mutual"] !== undefined ? data["mutual"] : null;
            this.open_for_allies = data["open_for_allies"] !== undefined ? data["open_for_allies"] : null;
            this.retracted = data["retracted"] ? new Date(data["retracted"].toString()) : null;
            this.started = data["started"] ? new Date(data["started"].toString()) : null;
        }
    }

    static fromJS(data: any): Response47 {
        return new Response47(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["aggressor"] = this.aggressor ? this.aggressor.toJS() : null;
        if (this.allies && this.allies.constructor === Array) {
            data["allies"] = [];
            for (let item of this.allies)
                data["allies"].push(item.toJS());
        }
        data["declared"] = this.declared ? this.declared.toISOString() : null;
        data["defender"] = this.defender ? this.defender.toJS() : null;
        data["finished"] = this.finished ? this.finished.toISOString() : null;
        data["id"] = this.id !== undefined ? this.id : null;
        data["mutual"] = this.mutual !== undefined ? this.mutual : null;
        data["open_for_allies"] = this.open_for_allies !== undefined ? this.open_for_allies : null;
        data["retracted"] = this.retracted ? this.retracted.toISOString() : null;
        data["started"] = this.started ? this.started.toISOString() : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response47(JSON.parse(json));
    }
}

/** war_id is not valid */
export class Exception97 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception97 {
        return new Exception97(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception97(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception98 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception98 {
        return new Exception98(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception98(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource55 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

/** 200 ok object */
export class Response48 { 
    /** A hash of this killmail */
    killmail_hash: string; 
    /** ID of this killmail */
    killmail_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.killmail_hash = data["killmail_hash"] !== undefined ? data["killmail_hash"] : null;
            this.killmail_id = data["killmail_id"] !== undefined ? data["killmail_id"] : null;
        }
    }

    static fromJS(data: any): Response48 {
        return new Response48(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["killmail_hash"] = this.killmail_hash !== undefined ? this.killmail_hash : null;
        data["killmail_id"] = this.killmail_id !== undefined ? this.killmail_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Response48(JSON.parse(json));
    }
}

/** war_id is not valid */
export class Exception99 { 
    /** error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception99 {
        return new Exception99(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception99(JSON.parse(json));
    }
}

/** Internal server error */
export class Exception100 { 
    /** Internal server error message */
    error?: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.error = data["error"] !== undefined ? data["error"] : null;
        }
    }

    static fromJS(data: any): Exception100 {
        return new Exception100(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["error"] = this.error !== undefined ? this.error : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Exception100(JSON.parse(json));
    }
}

/** The server name you would like data from */
export enum Datasource56 {
    Tranquility = <any>"tranquility", 
    Singularity = <any>"singularity", 
}

export enum Response5Gender {
    Female = <any>"female", 
    Male = <any>"male", 
}

export enum Response6Location_flag {
    AutoFit = <any>"AutoFit", 
    Cargo = <any>"Cargo", 
    CorpseBay = <any>"CorpseBay", 
    DroneBay = <any>"DroneBay", 
    FleetHangar = <any>"FleetHangar", 
    Hangar = <any>"Hangar", 
    HangarAll = <any>"HangarAll", 
    LoSlot0 = <any>"LoSlot0", 
    LoSlot1 = <any>"LoSlot1", 
    LoSlot2 = <any>"LoSlot2", 
    LoSlot3 = <any>"LoSlot3", 
    LoSlot4 = <any>"LoSlot4", 
    LoSlot5 = <any>"LoSlot5", 
    LoSlot6 = <any>"LoSlot6", 
    LoSlot7 = <any>"LoSlot7", 
    MedSlot0 = <any>"MedSlot0", 
    MedSlot1 = <any>"MedSlot1", 
    MedSlot2 = <any>"MedSlot2", 
    MedSlot3 = <any>"MedSlot3", 
    MedSlot4 = <any>"MedSlot4", 
    MedSlot5 = <any>"MedSlot5", 
    MedSlot6 = <any>"MedSlot6", 
    MedSlot7 = <any>"MedSlot7", 
    HiSlot0 = <any>"HiSlot0", 
    HiSlot1 = <any>"HiSlot1", 
    HiSlot2 = <any>"HiSlot2", 
    HiSlot3 = <any>"HiSlot3", 
    HiSlot4 = <any>"HiSlot4", 
    HiSlot5 = <any>"HiSlot5", 
    HiSlot6 = <any>"HiSlot6", 
    HiSlot7 = <any>"HiSlot7", 
    AssetSafety = <any>"AssetSafety", 
    Locked = <any>"Locked", 
    Unlocked = <any>"Unlocked", 
    Implant = <any>"Implant", 
    QuafeBay = <any>"QuafeBay", 
    RigSlot0 = <any>"RigSlot0", 
    RigSlot1 = <any>"RigSlot1", 
    RigSlot2 = <any>"RigSlot2", 
    RigSlot3 = <any>"RigSlot3", 
    RigSlot4 = <any>"RigSlot4", 
    RigSlot5 = <any>"RigSlot5", 
    RigSlot6 = <any>"RigSlot6", 
    RigSlot7 = <any>"RigSlot7", 
    ShipHangar = <any>"ShipHangar", 
    SpecializedFuelBay = <any>"SpecializedFuelBay", 
    SpecializedOreHold = <any>"SpecializedOreHold", 
    SpecializedGasHold = <any>"SpecializedGasHold", 
    SpecializedMineralHold = <any>"SpecializedMineralHold", 
    SpecializedSalvageHold = <any>"SpecializedSalvageHold", 
    SpecializedShipHold = <any>"SpecializedShipHold", 
    SpecializedSmallShipHold = <any>"SpecializedSmallShipHold", 
    SpecializedMediumShipHold = <any>"SpecializedMediumShipHold", 
    SpecializedLargeShipHold = <any>"SpecializedLargeShipHold", 
    SpecializedIndustrialShipHold = <any>"SpecializedIndustrialShipHold", 
    SpecializedAmmoHold = <any>"SpecializedAmmoHold", 
    SpecializedCommandCenterHold = <any>"SpecializedCommandCenterHold", 
    SpecializedPlanetaryCommoditiesHold = <any>"SpecializedPlanetaryCommoditiesHold", 
    SpecializedMaterialBay = <any>"SpecializedMaterialBay", 
    SubSystemSlot0 = <any>"SubSystemSlot0", 
    SubSystemSlot1 = <any>"SubSystemSlot1", 
    SubSystemSlot2 = <any>"SubSystemSlot2", 
    SubSystemSlot3 = <any>"SubSystemSlot3", 
    SubSystemSlot4 = <any>"SubSystemSlot4", 
    SubSystemSlot5 = <any>"SubSystemSlot5", 
    SubSystemSlot6 = <any>"SubSystemSlot6", 
    SubSystemSlot7 = <any>"SubSystemSlot7", 
    FighterBay = <any>"FighterBay", 
    FighterTube0 = <any>"FighterTube0", 
    FighterTube1 = <any>"FighterTube1", 
    FighterTube2 = <any>"FighterTube2", 
    FighterTube3 = <any>"FighterTube3", 
    FighterTube4 = <any>"FighterTube4", 
}

export enum Response6Location_type {
    Station = <any>"station", 
    Solar_system = <any>"solar_system", 
    Other = <any>"other", 
}

export class Target { 
    /** coordinates object */
    coordinates?: Coordinates; 
    /** item object */
    item?: Item; 
    /** location_id integer */
    location_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.coordinates = data["coordinates"] ? Coordinates.fromJS(data["coordinates"]) : null;
            this.item = data["item"] ? Item.fromJS(data["item"]) : null;
            this.location_id = data["location_id"] !== undefined ? data["location_id"] : null;
        }
    }

    static fromJS(data: any): Target {
        return new Target(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["coordinates"] = this.coordinates ? this.coordinates.toJS() : null;
        data["item"] = this.item ? this.item.toJS() : null;
        data["location_id"] = this.location_id !== undefined ? this.location_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Target(JSON.parse(json));
    }
}

export enum Response9Event_response {
    Declined = <any>"declined", 
    Not_responded = <any>"not_responded", 
    Accepted = <any>"accepted", 
    Tentative = <any>"tentative", 
}

export enum Response10Owner_type {
    Eve_server = <any>"eve_server", 
    Corporation = <any>"corporation", 
    Faction = <any>"faction", 
    Character = <any>"character", 
    Alliance = <any>"alliance", 
}

export enum Response11Response {
    Accepted = <any>"accepted", 
    Declined = <any>"declined", 
    Tentative = <any>"tentative", 
}

export class Home_location { 
    /** location_id integer */
    location_id?: number; 
    /** location_type string */
    location_type?: Home_locationLocation_type;

    constructor(data?: any) {
        if (data !== undefined) {
            this.location_id = data["location_id"] !== undefined ? data["location_id"] : null;
            this.location_type = data["location_type"] !== undefined ? data["location_type"] : null;
        }
    }

    static fromJS(data: any): Home_location {
        return new Home_location(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["location_id"] = this.location_id !== undefined ? this.location_id : null;
        data["location_type"] = this.location_type !== undefined ? this.location_type : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Home_location(JSON.parse(json));
    }
}

/** jump_clone object */
export class Jump_clones { 
    /** implants array */
    implants?: number[]; 
    /** location_id integer */
    location_id?: number; 
    /** location_type string */
    location_type?: Jump_clonesLocation_type;

    constructor(data?: any) {
        if (data !== undefined) {
            if (data["implants"] && data["implants"].constructor === Array) {
                this.implants = [];
                for (let item of data["implants"])
                    this.implants.push(item);
            }
            this.location_id = data["location_id"] !== undefined ? data["location_id"] : null;
            this.location_type = data["location_type"] !== undefined ? data["location_type"] : null;
        }
    }

    static fromJS(data: any): Jump_clones {
        return new Jump_clones(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        if (this.implants && this.implants.constructor === Array) {
            data["implants"] = [];
            for (let item of this.implants)
                data["implants"].push(item);
        }
        data["location_id"] = this.location_id !== undefined ? this.location_id : null;
        data["location_type"] = this.location_type !== undefined ? this.location_type : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Jump_clones(JSON.parse(json));
    }
}

/** recipient object */
export class Recipients { 
    /** recipient_id integer */
    recipient_id: number; 
    /** recipient_type string */
    recipient_type: RecipientsRecipient_type;

    constructor(data?: any) {
        if (data !== undefined) {
            this.recipient_id = data["recipient_id"] !== undefined ? data["recipient_id"] : null;
            this.recipient_type = data["recipient_type"] !== undefined ? data["recipient_type"] : null;
        }
    }

    static fromJS(data: any): Recipients {
        return new Recipients(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["recipient_id"] = this.recipient_id !== undefined ? this.recipient_id : null;
        data["recipient_type"] = this.recipient_type !== undefined ? this.recipient_type : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Recipients(JSON.parse(json));
    }
}

/** label object */
export class Labels { 
    /** color string */
    color?: string = "#ffffff"; 
    /** label_id integer */
    label_id?: number; 
    /** name string */
    name?: string; 
    /** unread_count integer */
    unread_count?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.color = data["color"] !== undefined ? data["color"] : "#ffffff";
            this.label_id = data["label_id"] !== undefined ? data["label_id"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
            this.unread_count = data["unread_count"] !== undefined ? data["unread_count"] : null;
        }
    }

    static fromJS(data: any): Labels {
        return new Labels(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["color"] = this.color !== undefined ? this.color : "#ffffff";
        data["label_id"] = this.label_id !== undefined ? this.label_id : null;
        data["name"] = this.name !== undefined ? this.name : null;
        data["unread_count"] = this.unread_count !== undefined ? this.unread_count : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Labels(JSON.parse(json));
    }
}

/** skill object */
export class Skills { 
    /** current_skill_level integer */
    current_skill_level?: number; 
    /** skill_id integer */
    skill_id?: number; 
    /** skillpoints_in_skill integer */
    skillpoints_in_skill?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.current_skill_level = data["current_skill_level"] !== undefined ? data["current_skill_level"] : null;
            this.skill_id = data["skill_id"] !== undefined ? data["skill_id"] : null;
            this.skillpoints_in_skill = data["skillpoints_in_skill"] !== undefined ? data["skillpoints_in_skill"] : null;
        }
    }

    static fromJS(data: any): Skills {
        return new Skills(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["current_skill_level"] = this.current_skill_level !== undefined ? this.current_skill_level : null;
        data["skill_id"] = this.skill_id !== undefined ? this.skill_id : null;
        data["skillpoints_in_skill"] = this.skillpoints_in_skill !== undefined ? this.skillpoints_in_skill : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Skills(JSON.parse(json));
    }
}

export class Alliance { 
    /** alliance_id integer */
    alliance_id: number; 
    /** True if the alliance has been deleted */
    is_deleted: boolean;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.is_deleted = data["is_deleted"] !== undefined ? data["is_deleted"] : null;
        }
    }

    static fromJS(data: any): Alliance {
        return new Alliance(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["is_deleted"] = this.is_deleted !== undefined ? this.is_deleted : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Alliance(JSON.parse(json));
    }
}

/** grantable_role string */
export enum Grantable_roles {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** grantable_roles_at_base string */
export enum Grantable_roles_at_base {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** grantable_roles_at_hq string */
export enum Grantable_roles_at_hq {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** grantable_roles_at_other string */
export enum Grantable_roles_at_other {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** role string */
export enum Roles {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** roles_at_base string */
export enum Roles_at_base {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** roles_at_hq string */
export enum Roles_at_hq {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

/** roles_at_other string */
export enum Roles_at_other {
    Director = <any>"Director", 
    Personnel_Manager = <any>"Personnel_Manager", 
    Accountant = <any>"Accountant", 
    Security_Officer = <any>"Security_Officer", 
    Factory_Manager = <any>"Factory_Manager", 
    Station_Manager = <any>"Station_Manager", 
    Auditor = <any>"Auditor", 
    Hangar_Take_1 = <any>"Hangar_Take_1", 
    Hangar_Take_2 = <any>"Hangar_Take_2", 
    Hangar_Take_3 = <any>"Hangar_Take_3", 
    Hangar_Take_4 = <any>"Hangar_Take_4", 
    Hangar_Take_5 = <any>"Hangar_Take_5", 
    Hangar_Take_6 = <any>"Hangar_Take_6", 
    Hangar_Take_7 = <any>"Hangar_Take_7", 
    Hangar_Query_1 = <any>"Hangar_Query_1", 
    Hangar_Query_2 = <any>"Hangar_Query_2", 
    Hangar_Query_3 = <any>"Hangar_Query_3", 
    Hangar_Query_4 = <any>"Hangar_Query_4", 
    Hangar_Query_5 = <any>"Hangar_Query_5", 
    Hangar_Query_6 = <any>"Hangar_Query_6", 
    Hangar_Query_7 = <any>"Hangar_Query_7", 
    Account_Take_1 = <any>"Account_Take_1", 
    Account_Take_2 = <any>"Account_Take_2", 
    Account_Take_3 = <any>"Account_Take_3", 
    Account_Take_4 = <any>"Account_Take_4", 
    Account_Take_5 = <any>"Account_Take_5", 
    Account_Take_6 = <any>"Account_Take_6", 
    Account_Take_7 = <any>"Account_Take_7", 
    Diplomat = <any>"Diplomat", 
    Config_Equipment = <any>"Config_Equipment", 
    Container_Take_1 = <any>"Container_Take_1", 
    Container_Take_2 = <any>"Container_Take_2", 
    Container_Take_3 = <any>"Container_Take_3", 
    Container_Take_4 = <any>"Container_Take_4", 
    Container_Take_5 = <any>"Container_Take_5", 
    Container_Take_6 = <any>"Container_Take_6", 
    Container_Take_7 = <any>"Container_Take_7", 
    Rent_Office = <any>"Rent_Office", 
    Rent_Factory_Facility = <any>"Rent_Factory_Facility", 
    Rent_Research_Facility = <any>"Rent_Research_Facility", 
    Junior_Accountant = <any>"Junior_Accountant", 
    Config_Starbase_Equipment = <any>"Config_Starbase_Equipment", 
    Trader = <any>"Trader", 
    Communications_Officer = <any>"Communications_Officer", 
    Contract_Manager = <any>"Contract_Manager", 
    Starbase_Defense_Operator = <any>"Starbase_Defense_Operator", 
    Starbase_Fuel_Technician = <any>"Starbase_Fuel_Technician", 
    Fitting_Manager = <any>"Fitting_Manager", 
    Terrestrial_Combat_Officer = <any>"Terrestrial_Combat_Officer", 
    Terrestrial_Logistics_Officer = <any>"Terrestrial_Logistics_Officer", 
}

export enum Response33State {
    Withdrawing = <any>"withdrawing", 
    Mobilizing = <any>"mobilizing", 
    Established = <any>"established", 
}

/** level object */
export class Levels { 
    /** cost number */
    cost: number; 
    /** Localized insurance level */
    name: string; 
    /** payout number */
    payout: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.cost = data["cost"] !== undefined ? data["cost"] : null;
            this.name = data["name"] !== undefined ? data["name"] : null;
            this.payout = data["payout"] !== undefined ? data["payout"] : null;
        }
    }

    static fromJS(data: any): Levels {
        return new Levels(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["cost"] = this.cost !== undefined ? this.cost : null;
        data["name"] = this.name !== undefined ? this.name : null;
        data["payout"] = this.payout !== undefined ? this.payout : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Levels(JSON.parse(json));
    }
}

/** attacker object */
export class Attackers { 
    /** alliance_id integer */
    alliance_id?: number; 
    /** character_id integer */
    character_id?: number; 
    /** corporation_id integer */
    corporation_id?: number; 
    /** damage_done integer */
    damage_done: number; 
    /** faction_id integer */
    faction_id?: number; 
    /** Was the attacker the one to achieve the final blow
 */
    final_blow: boolean; 
    /** Security status for the attacker
 */
    security_status: number; 
    /** What ship was the attacker flying
 */
    ship_type_id?: number; 
    /** What weapon was used by the attacker for the kill
 */
    weapon_type_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.character_id = data["character_id"] !== undefined ? data["character_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.damage_done = data["damage_done"] !== undefined ? data["damage_done"] : null;
            this.faction_id = data["faction_id"] !== undefined ? data["faction_id"] : null;
            this.final_blow = data["final_blow"] !== undefined ? data["final_blow"] : null;
            this.security_status = data["security_status"] !== undefined ? data["security_status"] : null;
            this.ship_type_id = data["ship_type_id"] !== undefined ? data["ship_type_id"] : null;
            this.weapon_type_id = data["weapon_type_id"] !== undefined ? data["weapon_type_id"] : null;
        }
    }

    static fromJS(data: any): Attackers {
        return new Attackers(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["character_id"] = this.character_id !== undefined ? this.character_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["damage_done"] = this.damage_done !== undefined ? this.damage_done : null;
        data["faction_id"] = this.faction_id !== undefined ? this.faction_id : null;
        data["final_blow"] = this.final_blow !== undefined ? this.final_blow : null;
        data["security_status"] = this.security_status !== undefined ? this.security_status : null;
        data["ship_type_id"] = this.ship_type_id !== undefined ? this.ship_type_id : null;
        data["weapon_type_id"] = this.weapon_type_id !== undefined ? this.weapon_type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Attackers(JSON.parse(json));
    }
}

export class Victim { 
    /** alliance_id integer */
    alliance_id?: number; 
    /** character_id integer */
    character_id?: number; 
    /** corporation_id integer */
    corporation_id?: number; 
    /** How much total damage was taken by the victim
 */
    damage_taken: number; 
    /** faction_id integer */
    faction_id?: number; 
    /** items array */
    items?: Items[]; 
    /** Coordinates of the victim in Cartesian space relative to the Sun
 */
    position?: Position; 
    /** The ship that the victim was piloting and was destroyed
 */
    ship_type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.character_id = data["character_id"] !== undefined ? data["character_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.damage_taken = data["damage_taken"] !== undefined ? data["damage_taken"] : null;
            this.faction_id = data["faction_id"] !== undefined ? data["faction_id"] : null;
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(Items.fromJS(item));
            }
            this.position = data["position"] ? Position.fromJS(data["position"]) : null;
            this.ship_type_id = data["ship_type_id"] !== undefined ? data["ship_type_id"] : null;
        }
    }

    static fromJS(data: any): Victim {
        return new Victim(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["character_id"] = this.character_id !== undefined ? this.character_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["damage_taken"] = this.damage_taken !== undefined ? this.damage_taken : null;
        data["faction_id"] = this.faction_id !== undefined ? this.faction_id : null;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJS());
        }
        data["position"] = this.position ? this.position.toJS() : null;
        data["ship_type_id"] = this.ship_type_id !== undefined ? this.ship_type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Victim(JSON.parse(json));
    }
}

export enum Response38Range {
    Station = <any>"station", 
    Region = <any>"region", 
    Solarsystem = <any>"solarsystem", 
    _1 = <any>"1", 
    _2 = <any>"2", 
    _3 = <any>"3", 
    _4 = <any>"4", 
    _5 = <any>"5", 
    _10 = <any>"10", 
    _20 = <any>"20", 
    _30 = <any>"30", 
    _40 = <any>"40", 
}

export enum Response40Event_type {
    Tcu_defense = <any>"tcu_defense", 
    Ihub_defense = <any>"ihub_defense", 
    Station_defense = <any>"station_defense", 
    Station_freeport = <any>"station_freeport", 
}

/** participant object */
export class Participants { 
    /** alliance_id integer */
    alliance_id: number; 
    /** score number */
    score: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.score = data["score"] !== undefined ? data["score"] : null;
        }
    }

    static fromJS(data: any): Participants {
        return new Participants(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["score"] = this.score !== undefined ? this.score : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Participants(JSON.parse(json));
    }
}

export enum Response42Category {
    Alliance = <any>"alliance", 
    Character = <any>"character", 
    Constellation = <any>"constellation", 
    Corporation = <any>"corporation", 
    Inventory_type = <any>"inventory_type", 
    Region = <any>"region", 
    Solar_system = <any>"solar_system", 
    Station = <any>"station", 
}

export class Position { 
    /** x number */
    x: number; 
    /** y number */
    y: number; 
    /** z number */
    z: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.x = data["x"] !== undefined ? data["x"] : null;
            this.y = data["y"] !== undefined ? data["y"] : null;
            this.z = data["z"] !== undefined ? data["z"] : null;
        }
    }

    static fromJS(data: any): Position {
        return new Position(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["x"] = this.x !== undefined ? this.x : null;
        data["y"] = this.y !== undefined ? this.y : null;
        data["z"] = this.z !== undefined ? this.z : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Position(JSON.parse(json));
    }
}

export class Aggressor { 
    /** Alliance ID if and only if the aggressor is an alliance */
    alliance_id?: number; 
    /** Corporation ID if and only if the aggressor is a corporation */
    corporation_id?: number; 
    /** ISK value of ships the aggressor has destroyed */
    isk_destroyed: number; 
    /** The number of ships the aggressor has killed */
    ships_killed: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.isk_destroyed = data["isk_destroyed"] !== undefined ? data["isk_destroyed"] : null;
            this.ships_killed = data["ships_killed"] !== undefined ? data["ships_killed"] : null;
        }
    }

    static fromJS(data: any): Aggressor {
        return new Aggressor(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["isk_destroyed"] = this.isk_destroyed !== undefined ? this.isk_destroyed : null;
        data["ships_killed"] = this.ships_killed !== undefined ? this.ships_killed : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Aggressor(JSON.parse(json));
    }
}

/** ally object */
export class Allies { 
    /** Alliance ID if and only if this ally is an alliance */
    alliance_id?: number; 
    /** Corporation ID if and only if this ally is a corporation */
    corporation_id?: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
        }
    }

    static fromJS(data: any): Allies {
        return new Allies(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Allies(JSON.parse(json));
    }
}

export class Defender { 
    /** Alliance ID if and only if the defender is an alliance */
    alliance_id?: number; 
    /** Corporation ID if and only if the defender is a corporation */
    corporation_id?: number; 
    /** ISK value of ships the defender has killed */
    isk_destroyed: number; 
    /** The number of ships the defender has killed */
    ships_killed: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.alliance_id = data["alliance_id"] !== undefined ? data["alliance_id"] : null;
            this.corporation_id = data["corporation_id"] !== undefined ? data["corporation_id"] : null;
            this.isk_destroyed = data["isk_destroyed"] !== undefined ? data["isk_destroyed"] : null;
            this.ships_killed = data["ships_killed"] !== undefined ? data["ships_killed"] : null;
        }
    }

    static fromJS(data: any): Defender {
        return new Defender(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["alliance_id"] = this.alliance_id !== undefined ? this.alliance_id : null;
        data["corporation_id"] = this.corporation_id !== undefined ? this.corporation_id : null;
        data["isk_destroyed"] = this.isk_destroyed !== undefined ? this.isk_destroyed : null;
        data["ships_killed"] = this.ships_killed !== undefined ? this.ships_killed : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Defender(JSON.parse(json));
    }
}

export class Coordinates { 
    /** x number */
    x: number; 
    /** y number */
    y: number; 
    /** z number */
    z: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.x = data["x"] !== undefined ? data["x"] : null;
            this.y = data["y"] !== undefined ? data["y"] : null;
            this.z = data["z"] !== undefined ? data["z"] : null;
        }
    }

    static fromJS(data: any): Coordinates {
        return new Coordinates(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["x"] = this.x !== undefined ? this.x : null;
        data["y"] = this.y !== undefined ? this.y : null;
        data["z"] = this.z !== undefined ? this.z : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Coordinates(JSON.parse(json));
    }
}

export class Item { 
    /** item_id integer */
    item_id: number; 
    /** type_id integer */
    type_id: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.item_id = data["item_id"] !== undefined ? data["item_id"] : null;
            this.type_id = data["type_id"] !== undefined ? data["type_id"] : null;
        }
    }

    static fromJS(data: any): Item {
        return new Item(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["item_id"] = this.item_id !== undefined ? this.item_id : null;
        data["type_id"] = this.type_id !== undefined ? this.type_id : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Item(JSON.parse(json));
    }
}

export enum Home_locationLocation_type {
    Station = <any>"station", 
    Structure = <any>"structure", 
}

export enum Jump_clonesLocation_type {
    Station = <any>"station", 
    Structure = <any>"structure", 
}

export enum RecipientsRecipient_type {
    Alliance = <any>"alliance", 
    Character = <any>"character", 
    Corporation = <any>"corporation", 
    Mailing_list = <any>"mailing_list", 
}


/** item object */
export class Items { 
    /** Flag for the location of the item
 */
    flag: number; 
    /** item_type_id integer */
    item_type_id: number; 
    /** items array */
    items?: Items[]; 
    /** How many of the item were destroyed if any
 */
    quantity_destroyed?: number; 
    /** How many of the item were dropped if any
 */
    quantity_dropped?: number; 
    /** singleton integer */
    singleton: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.flag = data["flag"] !== undefined ? data["flag"] : null;
            this.item_type_id = data["item_type_id"] !== undefined ? data["item_type_id"] : null;
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(Items.fromJS(item));
            }
            this.quantity_destroyed = data["quantity_destroyed"] !== undefined ? data["quantity_destroyed"] : null;
            this.quantity_dropped = data["quantity_dropped"] !== undefined ? data["quantity_dropped"] : null;
            this.singleton = data["singleton"] !== undefined ? data["singleton"] : null;
        }
    }

    static fromJS(data: any): Items {
        return new Items(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data["flag"] = this.flag !== undefined ? this.flag : null;
        data["item_type_id"] = this.item_type_id !== undefined ? this.item_type_id : null;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJS());
        }
        data["quantity_destroyed"] = this.quantity_destroyed !== undefined ? this.quantity_destroyed : null;
        data["quantity_dropped"] = this.quantity_dropped !== undefined ? this.quantity_dropped : null;
        data["singleton"] = this.singleton !== undefined ? this.singleton : null;
        return data; 
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        var json = this.toJSON();
        return new Items(JSON.parse(json));
    }
}