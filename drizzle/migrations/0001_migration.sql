alter table public.packages alter column policies set default 'Precios por persona en habitación doble, sujetos a disponibilidad y variación de tarifa aérea. Reserva con 30% de adelanto. Cambios de fecha sujetos a penalidad de la aerolínea.';

with v(slug,category,region,title,dest,days,nights,pen,usd,img,badge,extras,is_offer,offer_days,discount,ord) as (values
 ('cusco-machu-picchu','nacional','Perú','Cusco y Machu Picchu','Cusco',4,3,1290,345,'/images/cusco.jpg','Más vendido',array['City tour y Valle Sagrado','Machu Picchu'],true,21,15,1),
 ('arequipa-colca','nacional','Perú','Arequipa y Cañón del Colca','Arequipa',4,3,990,265,'/images/arequipa.jpg','Salida garantizada',array['City tour Arequipa','Cañón del Colca'],false,null,null,2),
 ('mancora-sol-y-playa','nacional','Perú','Máncora sol y playa','Máncora',5,4,1150,310,'/images/mancora.jpg','Oferta',array['Nado con tortugas','Paseo a Punta Sal','Día libre de playa'],true,23,20,3),
 ('iquitos-amazonia','nacional','Perú','Iquitos y la Amazonía','Iquitos',4,3,1390,375,'/images/iquitos.jpg',null,array['Lodge en la selva','Isla de los Monos'],false,null,null,4),
 ('paracas-ica-huacachina','nacional','Perú','Paracas, Ica y Huacachina','Paracas',3,2,690,185,'/images/paracas-ica.jpg','Salida garantizada',array['Islas Ballestas y tubulares en Huacachina'],false,null,null,5),
 ('tarapoto-cataratas','nacional','Perú','Tarapoto y sus cataratas','Tarapoto',4,3,1090,295,'/images/tarapoto.jpg',null,array['Laguna Azul','Catarata de Ahuashiyacu'],false,null,null,6),
 ('chiclayo-senor-de-sipan','nacional','Perú','Chiclayo y el Señor de Sipán','Chiclayo',3,2,790,215,'/images/chiclayo.jpg',null,array['Museo Tumbas Reales y Pimentel'],false,null,null,7),
 ('trujillo-chan-chan','nacional','Perú','Trujillo y Chan Chan','Trujillo',3,2,750,205,'/images/trujillo.jpg',null,array['Chan Chan y Huanchaco'],false,null,null,8),
 ('cancun-todo-incluido','internacional','Caribe','Cancún Todo Incluido','Cancún',6,5,4290,1150,'/images/cancun.jpg','Más vendido',array['Xcaret','Isla Mujeres','Chichén Itzá','Día libre'],true,29,18,9),
 ('punta-cana-relax','internacional','Caribe','Punta Cana Relax','Punta Cana',5,4,3690,990,'/images/punta-cana.jpg','Oferta',array['Isla Saona','Día de spa','Día libre'],true,30,12,10),
 ('miami-orlando','internacional','Norteamérica','Miami y Orlando','Miami',7,6,5190,1390,'/images/miami.jpg',null,array['City tour Miami','Everglades','Parques de Orlando','Parques de Orlando','Compras'],false,null,null,11),
 ('buenos-aires-tango','internacional','Sudamérica','Buenos Aires y Tango','Buenos Aires',5,4,2590,695,'/images/buenos-aires.jpg','Salida garantizada',array['City tour','Tigre y Delta','Cena show de tango'],false,null,null,12),
 ('rio-de-janeiro','internacional','Sudamérica','Río de Janeiro Maravilloso','Río de Janeiro',5,4,2890,775,'/images/rio.jpg',null,array['Cristo Redentor','Pan de Azúcar','Playas de Copacabana'],false,null,null,13),
 ('madrid-paris','internacional','Europa','Madrid y París','Madrid - París',10,9,10990,2950,'/images/madrid-paris.jpg','Salida garantizada',array['Madrid de los Austrias','Toledo','Tren a París','Torre Eiffel','Museo del Louvre','Versalles','Día libre','Montmartre'],true,34,10,14),
 ('estambul-capadocia','internacional','Asia','Estambul y Capadocia','Estambul',9,8,9290,2490,'/images/estambul.jpg',null,array['Mezquita Azul','Crucero por el Bósforo','Vuelo a Capadocia','Globo aerostático','Ciudad subterránea','Pamukkale','Día libre'],false,null,null,15),
 ('tokio-japon','internacional','Asia','Tokio y Monte Fuji','Tokio',10,9,14290,3830,'/images/tokio.jpg',null,array['Shibuya y Shinjuku','Asakusa','Monte Fuji','Hakone','Kioto','Nara','Osaka','Día libre'],false,null,null,16)
)
insert into public.packages (slug,category,region,title,destination,summary,description,duration_days,duration_nights,price_pen,price_usd,image_url,gallery,includes,not_includes,itinerary,badge,is_offer,offer_ends_at,offer_discount,sort_order)
select slug,category,region,title,dest,
  days||'D/'||nights||'N con vuelo, hotel, traslados y tours.',
  'Descubre '||dest||' con todo resuelto: vuelos desde Lima, hotel seleccionado, traslados y las excursiones imperdibles organizadas por nuestro equipo.',
  days,nights,pen,usd,img,
  case when category='nacional' then array[img,'/images/hero-machu-picchu.jpg'] else array[img] end,
  array['Boleto aéreo Lima - '||split_part(dest,' - ',1)||' - Lima','Traslados aeropuerto - hotel - aeropuerto',nights||' noches de hotel con desayuno','Tours indicados con guía en español', case when category='internacional' then 'Seguro de viaje básico' else 'Asistencia KM 24/7' end],
  case when category='internacional' then array['Tasas turísticas locales','Comidas no indicadas','Visas si aplica'] else array['Almuerzos y cenas no indicados','Propinas','Gastos personales'] end,
  jsonb_build_array(jsonb_build_object('day',1,'title','Llegada a '||split_part(dest,' - ',1),'description','Recojo en el aeropuerto y traslado al hotel. Tarde libre para descansar.'))
   || coalesce((select jsonb_agg(jsonb_build_object('day',o+1,'title',e,'description','Día completo: '||e||', con guía profesional en español.') order by o) from unnest(extras) with ordinality t(e,o)),'[]'::jsonb)
   || jsonb_build_array(jsonb_build_object('day',days,'title','Retorno','description','Desayuno, check-out y traslado al aeropuerto. ¡Fin de los servicios!')),
  badge,is_offer,case when is_offer then now() + make_interval(days => offer_days) end,discount,ord
from v;

with c(slug,region,title,route,days,nights,pen,usd,img,op,badge,ord) as (values
 ('crucero-caribe','Caribe','Crucero Caribe Occidental','Miami · Cozumel · Roatán · Costa Maya · Miami',8,7,5490,1470,'/images/crucero-caribe.jpg','Royal Caribbean','Más vendido',17),
 ('crucero-mediterraneo','Mediterráneo','Crucero Mediterráneo','Barcelona · Marsella · Génova · Roma · Santorini',8,7,6990,1870,'/images/crucero-mediterraneo.jpg','MSC Cruceros','Oferta',18),
 ('crucero-sudamerica','Sudamérica','Crucero Fiordos de Sudamérica','Valparaíso · Puerto Montt · Fiordos · Ushuaia · Buenos Aires',9,8,7490,2010,'/images/crucero-sudamerica.jpg','Norwegian Cruise Line',null,19),
 ('crucero-alaska','Alaska','Crucero Glaciares de Alaska','Seattle · Juneau · Skagway · Glacier Bay · Victoria',8,7,8290,2220,'/images/crucero-alaska.jpg','Princess Cruises','Salida garantizada',20)
)
insert into public.packages (slug,category,region,title,destination,summary,description,duration_days,duration_nights,price_pen,price_usd,image_url,gallery,includes,not_includes,operator,badge,sort_order)
select slug,'crucero',region,title,route,nights||' noches a bordo con '||op||'.',
 'Itinerario: '||route||'. Pensión completa a bordo, entretenimiento y paradas en puertos espectaculares.',
 days,nights,pen,usd,img,array[img],
 array['Camarote interior','Pensión completa a bordo','Shows y entretenimiento','Tasas portuarias'],
 array['Vuelos al puerto de embarque','Excursiones en tierra','Propinas a bordo'],op,badge,ord from c;

with h(slug,title,loc,stars,pen,usd,img,am,ord) as (values
 ('hotel-resort-caribe','Paradise Beach Resort','Punta Cana, República Dominicana',5,650,175,'/images/hotel-resort.jpg',array['Todo incluido','Piscina infinita','Spa','Wi-Fi'],21),
 ('hotel-boutique-cusco','Casona Imperial Boutique','Centro Histórico, Cusco',4,420,115,'/images/hotel-cusco.jpg',array['Desayuno buffet','Oxígeno en habitación','Wi-Fi','Traslado'],22),
 ('hotel-miraflores-lima','Miraflores Ocean View','Miraflores, Lima',4,380,105,'/images/hotel-lima.jpg',array['Piscina en azotea','Desayuno','Gimnasio','Wi-Fi'],23),
 ('hotel-paracas-bahia','Bahía Paracas Lodge','Paracas, Ica',5,720,195,'/images/hotel-paracas.jpg',array['Media pensión','Piscina','Kayaks','Spa'],24)
)
insert into public.packages (slug,category,title,destination,location,summary,description,duration_days,duration_nights,price_pen,price_usd,image_url,gallery,includes,amenities,stars,sort_order)
select slug,'hotel',title,loc,loc,'Precio por noche en habitación doble.',
 'Hospédate en '||title||', en '||loc||'. Reservamos por ti con la mejor tarifa disponible.',
 1,1,pen,usd,img,array[img],am,am,stars,ord from h;
