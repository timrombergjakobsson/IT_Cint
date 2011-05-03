    <%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<IT_Cint.Models.Panelist>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Index
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script type="text/javascript">
        $(document).ready(function () {

            initializeMap();
            initAccordion();

        });
    </script>

    <div id="background">
        <div id="ajax-message">
            <span class="loading">Loading map...</span>        
        </div>
    </div>

   <div id = "greenRight">
        <div>
            <p>Cint in action</p>
            <p>A selection of Cint's live respondents</p>
        </div>
   </div>
   
   <div id ="mapContainer">
        <div id="instructions">
            <p>Double-click to zoom or pick a region/country in the menu on the right-hand side</p>
        </div>
   
        <div id="map">
        </div>
    <div id="sidemenu">
        <div id="maxZoomMap">
            <h3><a href="#">World</a></h3> 
        </div>

        <div id="accordion">
            <h3><a href="#">Europe</a></h3>
            <div>
                <ul id="europe">
                    <li>Austria</li>
                    <li>Belgium</li>
                    <li>Czech Republic</li>
                    <li>Denmark</li>
                    <li>Estonia</li>
                    <li>Finland</li>
                    <li>France</li>
                    <li>Germany</li>
                    <li>Greece</li>
                    <li>Ireland</li>
                    <li>Italy</li>
                    <li>Latvia</li>
                    <li>Lithuania</li>
                    <li>Netherlands</li>
                    <li>Norway</li>
                    <li>Poland</li>
                    <li>Portugal</li>
                    <li>Romania</li>
                    <li>Russia</li>
                    <li>Spain</li>
                    <li>Sweden</li>
                    <li>Switzerland</li>
                    <li>Turkey</li>
                    <li>UK</li>
                    <li>Ukraine</li>
                </ul>
                       
            </div>

            <h3><a href="#">North America</a></h3>
            <div>
                <ul id="northAmerica">
                    <li>Canada</li>
                    <li>Puerto Rico</li>
                    <li>Mexico</li>
                    <li>Guatemala</li>
                    <li>USA</li>
                </ul>
            </div>

            <h3><a href="#">South America</a></h3>
            <div>
                <ul id="southAmerica">
                    <li>Argentina</li>
                    <li>Brazil</li>
                    <li>Chile</li>
                    <li>Columbia</li>
                    <li>Peru</li>
                    <li>Venezuela</li>
                </ul>
            </div>

            <h3><a href="#">Asia-Pacific</a></h3>
            <div>
                <ul id="asiaPacific">
                    <li>Australia</li>
                    <li>China</li>
                    <li>India</li>
                    <li>Japan</li>
                    <li>Kazakhstan</li>
                    <li>Philippines</li>
                </ul>
            </div>

            <h3><a href="#">Africa</a></h3>
            <div>
                <ul id="africa">
                    <li>South Africa</li>
                </ul>
            </div>

        </div><!-- end "accordion" -->
      </div><!--end #sidemenu -->
	  
	  <div id = "errorCount">Respondents with incomplete geografic location: <span></span></div>

    </div> <!-- end #mapContainer" -->

    <% string country = System.Globalization.RegionInfo.CurrentRegion.DisplayName;%>
    <div id = "userCountry"><%=country %></div>

</asp:Content>

