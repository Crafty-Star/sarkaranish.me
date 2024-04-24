import os

def list_images_in_folders():
    cwd = os.getcwd()
    folder_image_dict = {}
    for item in os.listdir(cwd):
        if os.path.isdir(os.path.join(cwd, item)):
            folder_path = os.path.join(cwd, item)
            image_list = []
            for file in os.listdir(folder_path):
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                    image_list.append(file)
            folder_image_dict[item] = image_list

    return folder_image_dict

# Example usage
if __name__ == "__main__":
    images_in_folders = list_images_in_folders()
    big = open('./index.html', 'w')
    content = """---
layout: page
title: "ALBUMS"
description: "archive"
active: gallery
header-img: "img/gallery.jpg"
images:"""
    for folder, images in images_in_folders.items():
        try:
            img = images[0]
        except:
            continue

        content += f"""\n- image_path: /gallery/{folder}/{img}
  gallery-folder: /gallery/{folder}/
  gallery-name: {folder}"""

        f = open(f"{folder}/index.html", "w")
        header = f"""---
layout: page
title: "{folder}"
active: gallery
header-img: "gallery/{folder}/{img}"
album-title: "{folder}"
images:"""
        for image in images:
            header += f"\n- image_path: /gallery/{folder}/{image}"
        header += '\n---'
        header += """
<html class="no-js" lang="en">
<head>
	<meta content="charset=utf-8">
</head>

    <body>
 
	<section id="content" role="main">
		<div class="wrapper">
	<br><br>
			<h2>{{page.album-title}}</h2>


			<!-- Gallery __-->
			<div class="gallery masonry-gallery">
		
{% for image in page.images %}  		

				<figure class="gallery-item">
					<header class='gallery-icon'>

<a href="{{ site.url }}{{ site.baseurl }}{{ image.image_path }}" class="popup"  title="{{ image.caption }}" data-caption="{{ image.copyright }}">
<img src="{{ site.url }}{{ site.baseurl }}{{ image.image_path }}"></a>
						
					</header>	
					<figcaption class='gallery-caption'>
						<div class="entry-summary" id="{{ image.caption }}">
							<h3>{{image.caption}}</h3>
							<p>{{image.copyright}}</p>
						</div>
					</figcaption>
				</figure>
				
{% endfor %}

			</div>

		</div><!-- END .wrapper -->
	</section>

<!-- jQuery -->    

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- include image popups -->
<script src="{{ site.baseurl }}/js/jquery.magnific-popup.js"></script>

<script type="text/javascript">
      $(document).ready(function($) {
        $('a.popup').magnificPopup({
         type: 'image',
	  gallery:{
         enabled:true,
         navigateByImgClick: true,
         preload: [0,1] // Will preload 0 - before current, and 1 after the current image
       },
image: {
      titleSrc: function(item) {
              return item.el.attr('title') + '&nbsp;' + item.el.attr('data-caption');
            }
        }
          // other options
      });
});
    </script>

<script src="{{ site.baseurl }}/js/retina.min.js"></script>
<!-- include Masonry -->
<script src="{{ site.baseurl }}/js/isotope.pkgd.min.js"></script> 
<!-- include mousewheel plugins -->
<script src="{{ site.baseurl }}/js/jquery.mousewheel.min.js"></script>
<!-- include carousel plugins -->
<script src="{{ site.baseurl}}/js/jquery.tinycarousel.min.js"></script>
<!-- include svg line drawing plugin -->
<script src="{{ site.baseurl }}/js/jquery.lazylinepainter.min.js"></script>
<!-- include custom script -->
<script src="{{ site.baseurl }}/js/scripts.js"></script>
<!-- Modernizr -->
 <script src="{{ site.baseurl }}/js/modernizr.js"></script>

    
</body></html>"""
        # here
        f.write(header)
        f.close()
    content += """\n---

<html class="no-js" lang="en">
<head>
	<meta content="charset=utf-8">
    <link rel="stylesheet" href="{{ "/css/selena.css" | prepend: site.baseurl }}">
</head>


    <body class="gallery">
 
	<section id="content" role="main">
		<div class="wrapper">
	
			<h2>{{page.title}}</h2>
			
			<!-- Gallery __-->
			<div class="gallery masonry-gallery">
				
{% for image in page.images %}  	

	               <figure class="gallery-item">
                         <figure class="effect-selena">
					<header class='gallery-icon'>
		       
<a href="{{ site.url }}{{ site.baseurl }}{{ image.gallery-folder }}">
<img src="{{ site.url }}{{ site.baseurl }}{{ image.image_path }}"></a>

					</header>	
					<figcaption class='gallery-caption'>
						<div class="entry-summary">
							<h3>{{image.gallery-name}}</h3>
							<p>{{image.gallery-date}}</p>
						</div>
					</figcaption>
                       </figure>
				</figure>
							
{% endfor %}		
				
			</div>
			
		</div><!-- END .wrapper -->
	</section>


<br>
<!-- jQuery -->    

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="{{ site.baseurl }}/js/retina.min.js"></script>
<!-- include Masonry -->
<script src="{{ site.baseurl }}/js/isotope.pkgd.min.js"></script> 
<!-- include mousewheel plugins -->
<script src="{{ site.baseurl }}/js/jquery.mousewheel.min.js"></script>
<!-- include carousel plugins -->
<script src="{{ site.baseurl}}/js/jquery.tinycarousel.min.js"></script>
<!-- include svg line drawing plugin -->
<script src="{{ site.baseurl }}/js/jquery.lazylinepainter.min.js"></script>
<!-- include custom script -->
<script src="{{ site.baseurl }}/js/scripts.js"></script>
<!-- Modernizr -->
 <script src="{{ site.baseurl }}/js/modernizr.js"></script>

</body></html>"""
    big.write(content)
    big.close()

