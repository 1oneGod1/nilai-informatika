// English version; lesson IDs, answer indices and assessment weights match Indonesian.
const CONFIG = {
  "gradebookUrl": "../index.html",
  "bsdUrl": "https://app.bsd.education/",
  "teacher": "Andi Purba",
  "course": "Construct a VR World",
  "courseBrief": {
    "mainGoal": "Design, build, and test a simple virtual diorama with a clear theme, an interaction, and a purpose you can explain to visitors.",
    "overview": "Start with a scene and 3D shapes, then add textures, lighting, imported models, and gaze interaction. Next, design your own diorama, test it with a partner, improve it, and explain your decisions.",
    "outcomes": [
      "Arrange 3D objects and adjust their position, rotation, and size.",
      "Choose textures and lighting that support the theme and keep important objects visible.",
      "Create one simple interaction and test the visitor experience.",
      "Explain your code, credit asset sources, and document revisions."
    ],
    "finalTask": "One clearly themed diorama in the BSD Sandbox that uses shapes, textures, lighting, a third-party model, and one interaction, submitted with its theme, feature list, and asset source notes.",
    "stages": [
      [
        "1–2",
        "Foundations",
        "Scenes, attributes, shapes, coordinates, and object groups."
      ],
      [
        "3–5",
        "Visuals & interaction",
        "Textures, lighting, imported models, and gaze responses."
      ],
      [
        "6",
        "Final project",
        "Plan, build, and submit a VR diorama."
      ]
    ],
    "wka": {
      "principle": "Use your creative abilities responsibly and with care for others.",
      "reference": "Genesis 1:27; Philippians 2:4",
      "url": "https://www.bible.com/bible/111/GEN.1.27.NIV",
      "practice": "Design an experience that helps visitors, use assets honestly, and listen to feedback.",
      "question": "Who could benefit from your virtual creation?",
      "sources": [
        {
          "reference": "Genesis 1:27",
          "url": "https://www.bible.com/bible/111/GEN.1.27.NIV"
        },
        {
          "reference": "Philippians 2:4",
          "url": "https://www.bible.com/bible/111/PHP.2.4.NIV"
        }
      ]
    }
  }
};
const LESSONS = [
  {
    "id": 1,
    "title": "Hello, virtual world!",
    "subtitle": "Discover VR and build your first scene.",
    "tag": "Foundations",
    "label": "First scene",
    "lab": "position",
    "prompt": "If you could take your classmates somewhere without leaving the classroom, what place would you create?",
    "bsd": [
      "Explore “Code Your Own World with VR”",
      "Set up A-Frame"
    ],
    "scope": "Start with an introduction, load A-Frame, and create a scene with simple objects.",
    "goals": [
      "Explain one purpose of a virtual world.",
      "Identify scenes, elements, and attributes.",
      "Create an object in an A-Frame scene."
    ],
    "concepts": [
      [
        "A scene is a space",
        "<a-scene> contains the 3D world. Objects, lighting, and cameras belong inside it."
      ],
      [
        "Elements create objects",
        "Elements such as <a-box> create shapes. Attributes such as color and position control their appearance."
      ],
      [
        "Load the framework",
        "A-Frame is loaded through a <script> element. In BSD, follow the library address given in the project instructions."
      ]
    ],
    "code": "<a-scene>\n  <a-box position=\"0 1 -3\"\n         color=\"#D8EF9B\"></a-box>\n</a-scene>",
    "challenge": "Add a second object with a different color. Explain which parts of the code set the color and position of each object.",
    "evidence": "A scene with two objects, plus an explanation of the scene and one attribute.",
    "submitEvidence": "BSD link to a scene with two objects + an explanation of the scene and one attribute.",
    "submitExample": "Example: I added a blue a-sphere at position=\"1 1 -3\" next to a red a-box. The color attribute sets the colour, position sets the location, and a-scene holds the whole 3D world.",
    "summary": [
      "The scene contains the 3D world.",
      "Elements create objects; attributes control their properties.",
      "Test what appears on screen, rather than only typing code."
    ],
    "reflection": "What object would you like to create next, and which element might you need?",
    "times": [
      [
        "HTML & JavaScript diagnostic",
        15
      ],
      [
        "Explore a VR example",
        10
      ],
      [
        "First scene & modification",
        40
      ],
      [
        "Formative quiz & discussion",
        10
      ],
      [
        "Exit ticket",
        5
      ]
    ],
    "teacher": "Use the diagnostic to plan support, not to assign a final grade. Review questions 1–3 for HTML tags/attributes and 4–5 for JavaScript variables/events; do not rely only on the total score. Ask students to change an attribute and explain the result as a practical check. Provide a starter scene and a JavaScript introduction before gaze interaction if needed.",
    "questions": [
      [
        "A box is written after </a-scene>. Which structural fix is correct?",
        [
          "Move the box inside <script>",
          "Move the box inside <a-scene>",
          "Change its color"
        ],
        1,
        "A-Frame world objects belong inside the scene."
      ],
      [
        "In <a-box position=\"0 1 -3\" color=\"red\">, what sets the color?",
        [
          "color=\"red\"",
          "position=\"0 1 -3\"",
          "Only the element name a-box"
        ],
        0,
        "color controls color; position controls location."
      ],
      [
        "An object disappears after a code change. What is a sensible first step?",
        [
          "Replace the entire project",
          "Change color, position, and library together",
          "Check the latest change, structure, position, and error messages"
        ],
        2,
        "Begin with evidence close to the problem and test one change."
      ]
    ],
    "openingQuestions": [
      [
        "In <a-box color=\"red\"></a-box>, which is the element name?",
        [
          "a-box",
          "color",
          "red"
        ],
        0,
        "a-box is the element name; color is an attribute and red is its value."
      ],
      [
        "How do you place a box inside a scene?",
        [
          "<a-scene></a-scene><a-box></a-box>",
          "<a-scene><a-box></a-box></a-scene>",
          "<a-box><a-scene></a-scene></a-box>"
        ],
        1,
        "The box belongs between the scene’s opening and closing tags."
      ],
      [
        "If only color changes from red to blue, what changes?",
        [
          "The box’s location",
          "The box’s size",
          "The box’s color"
        ],
        2,
        "The attribute being changed controls the corresponding property."
      ],
      [
        "What does let warna = \"red\"; do in JavaScript?",
        [
          "Stores red in the variable warna",
          "Immediately creates a red box",
          "Loads the A-Frame library"
        ],
        0,
        "A variable stores a value; changing an object requires another instruction."
      ],
      [
        "button.addEventListener(\"click\", ubahWarna) means…",
        [
          "ubahWarna runs when the file is saved",
          "ubahWarna is called when button receives a click",
          "button changes color without another function"
        ],
        1,
        "An event listener connects an event to a response function."
      ]
    ],
    "bsdFocus": [
      "Explore “Code Your Own World with VR” and Set up A-Frame: load the library, create a scene, add shapes, and change one attribute.",
      "Students do not need to complete the entire course or every BSD quiz in this lesson."
    ],
    "preparation": "Check BSD account access. Prepare a starter scene and tag/attribute examples. Test the library before class.",
    "minimumTarget": "Two objects are visible; the student identifies the scene, an element, and the color attribute.",
    "support": "If tags/attributes are unfamiliar, provide a starter scene and change one attribute at a time. If variables/events need support, add a 5–10 minute introduction during practice and scaffold lesson 5.",
    "exitQuestion": "Name the element that contains the world, then one attribute you changed and its effect.",
    "exitExpected": "Identify a-scene and connect a correct attribute (such as color/position) to an observed change.",
    "brief": {
      "mainGoal": "Build a simple A-Frame scene and explain the relationship between the scene, objects, and attributes.",
      "material": [
        "VR presents a three-dimensional space that people can explore. In A-Frame, the scene contains the space, elements create objects, and attributes control properties such as color or position.",
        "Today we load the library as instructed in BSD, create a scene, and add two objects. Focus on identifying code and observing the effect of one change."
      ],
      "why": "Your first scene is the foundation you will reuse in the final diorama.",
      "tasks": [
        "Complete the opening diagnostic so your teacher can plan support.",
        "Follow the BSD scene activity and add a second object with a different color.",
        "Change one attribute, test the result, then complete the quiz and exit ticket."
      ],
      "success": [
        "Two objects are visible inside the scene.",
        "You can identify the scene, object elements, and one attribute in your code.",
        "You can explain the visual change caused by the attribute you modified."
      ],
      "wka": {
        "principle": "People are made in God’s image; every user deserves respect.",
        "reference": "Genesis 1:27",
        "url": "https://www.bible.com/bible/111/GEN.1.27.NIV",
        "practice": "Choose a virtual-world idea that benefits and respects its visitors.",
        "question": "What positive experience would you like to give visitors?"
      },
      "teacherScript": "Today we will start a virtual world with two simple objects. We will identify the scene, elements, and attributes, then observe how changing code changes the result. Your task is to add a second object and explain one change. Be ready to show both the code and its result. From the start, consider a positive experience for your visitors."
    }
  },
  {
    "id": 2,
    "title": "Give your shapes a story",
    "subtitle": "Combine shapes. Adjust position and rotation.",
    "tag": "Foundations",
    "label": "Modeling",
    "lab": "position",
    "prompt": "How could you build a table using only boxes and cylinders?",
    "bsd": [
      "A-Frame Modeling"
    ],
    "scope": "Focus on simple shapes, coordinates, rotation, and parent objects. Use the BSD DNA model as an example.",
    "goals": [
      "Combine shapes into one model.",
      "Predict changes along the X, Y, and Z axes.",
      "Use a parent object to group parts."
    ],
    "concepts": [
      [
        "Three directions, one position",
        "position uses the order X Y Z. X moves horizontally, Y changes height, and Z changes depth."
      ],
      [
        "Position differs from rotation",
        "position moves an object. rotation changes its orientation in degrees around X, Y, and Z."
      ],
      [
        "Parts follow their parent",
        "<a-entity> can group objects. Child positions are relative to the parent; transforming the parent affects the group."
      ]
    ],
    "code": "<a-entity position=\"0 1 -3\">\n  <a-box width=\"2\" height=\"0.2\" depth=\"1\"></a-box>\n  <a-cylinder position=\"0 -0.6 0\"\n              radius=\"0.1\" height=\"1\"></a-cylinder>\n</a-entity>",
    "challenge": "Create a tree, chair, or table from several shapes. Move the whole model by changing its parent, then explain what happened.",
    "evidence": "A combined model and a demonstration of one position or rotation change.",
    "submitEvidence": "BSD link to a combined model + an explanation of one position or rotation change made through the parent object.",
    "submitExample": "Example: I built a tree from an a-cylinder (trunk) and an a-sphere (leaves) inside one a-entity. When I changed the parent position from 0 0 -3 to 2 0 -3, the whole tree moved.",
    "summary": [
      "Coordinates use X Y Z order.",
      "Rotation changes orientation; position changes location.",
      "A parent helps manage parts as one group."
    ],
    "reflection": "Why is a parent object useful compared with moving each part separately?",
    "times": [
      [
        "Opening quiz & prediction",
        10
      ],
      [
        "Guided modeling",
        30
      ],
      [
        "Independent model modification",
        25
      ],
      [
        "Formative quiz & exit ticket",
        15
      ]
    ],
    "teacher": "Ask for predictions before changing values. When an object is invisible, check its position and parent–child relationship. A new model provides evidence of transfer beyond the tutorial.",
    "questions": [
      [
        "Y changes from 1 to 2 while X and Z stay the same. What happens?",
        [
          "The object moves one unit higher",
          "The object becomes one unit wider",
          "The object moves one unit further away"
        ],
        0,
        "Y controls height; size is unchanged."
      ],
      [
        "All tree parts are inside one <a-entity>. How can you rotate them together?",
        [
          "Change every leaf’s position",
          "Change the parent’s rotation",
          "Change the scene’s scale"
        ],
        1,
        "Rotating the parent transforms the child group."
      ],
      [
        "A parent is at \"2 0 -3\", and a child at \"1 0 0\", with no other rotation/scale. What is the child’s world position?",
        [
          "1 0 0",
          "2 0 -3",
          "3 0 -3"
        ],
        2,
        "With no other transformations, add the child’s relative position to the parent’s position."
      ]
    ],
    "openingQuestions": [
      [
        "A-Frame objects are placed inside…",
        [
          "<a-assets>",
          "<a-scene>",
          "<script>"
        ],
        1,
        "The scene contains the 3D objects."
      ],
      [
        "Two boxes need different colors. What should you change?",
        [
          "The scene name",
          "Only the file order",
          "Each box’s color value"
        ],
        2,
        "Each object’s color can be set through its color attribute."
      ],
      [
        "A box appears in the wrong place. What should you check first?",
        [
          "Its position",
          "The project title",
          "The creator’s name"
        ],
        0,
        "position determines location."
      ]
    ],
    "bsdFocus": [
      "A-Frame Modeling: use the BSD DNA model to illustrate shapes, coordinates, rotation, and groups.",
      "Choose representative sections and transfer the ideas to a simple tree/chair/table. The entire DNA model does not need to be completed in one session."
    ],
    "preparation": "Prepare a working grouped model and show the parent and children before students modify it.",
    "minimumTarget": "One combined model; the student moves or rotates its parent and predicts the result.",
    "support": "Provide two ready-made shapes. Change X/Y first, then rotation. Extension: add parts without breaking the group.",
    "exitQuestion": "If the parent moves two units along X, how do its children change? State your assumptions.",
    "exitExpected": "The children move with the parent. Without additional rotation/scale, their world X coordinates increase by two.",
    "brief": {
      "mainGoal": "Build one model from several shapes and transform the whole model through its parent.",
      "material": [
        "A table, tree, or chair can be built by combining simple shapes. position uses X, Y, Z order; rotation controls orientation.",
        "Group the parts under a parent object. Child positions are relative to the parent, so the group can move or rotate together."
      ],
      "why": "An original model shows that you can apply ideas beyond a tutorial example.",
      "tasks": [
        "Predict coordinate changes before changing the BSD modeling values.",
        "Build a tree, chair, or table from several shapes under one parent.",
        "Move or rotate the parent, demonstrate the result, then complete the quiz and exit ticket."
      ],
      "success": [
        "Your shapes form a recognizable model.",
        "Changing the parent affects all its parts.",
        "You can explain position versus rotation and the order X, Y, Z."
      ],
      "wka": {
        "principle": "Working wholeheartedly shapes how we use the abilities entrusted to us.",
        "reference": "Colossians 3:23",
        "url": "https://www.bible.com/bible/111/COL.3.23.NIV",
        "practice": "Arrange your model carefully and check it after changing its parent.",
        "question": "Which part needs refinement to make your model understandable?"
      },
      "teacherScript": "Today we will create an object from several shapes. We will use coordinates to position its parts, rotation to change orientation, and one parent to move the parts together. Build a simple model and demonstrate a change to its parent. Be ready to predict and explain the result. Careful construction and testing are part of working wholeheartedly."
    }
  },
  {
    "id": 3,
    "title": "Create the atmosphere",
    "subtitle": "Give your world character with textures and lighting.",
    "tag": "Visuals",
    "label": "Textures & lighting",
    "lab": "light",
    "prompt": "Why can the same room feel warm, calm, or mysterious just by changing its lighting?",
    "bsd": [
      "A-Frame Image Textures",
      "A-Frame Lighting and Fog"
    ],
    "scope": "Select texture and basic lighting activities. Fog and advanced variations are extensions.",
    "goals": [
      "Apply a texture to an object.",
      "Compare the effects of lighting changes.",
      "Explain how visual choices support atmosphere."
    ],
    "concepts": [
      [
        "Textures add surface detail",
        "An image can become a texture through src. Use suitable assets and check that the address loads."
      ],
      [
        "Lighting creates atmosphere",
        "Ambient light provides general illumination. Directional light comes from a particular direction. Their balance affects the appearance of shapes."
      ],
      [
        "Choices need a reason",
        "Choose textures and light intensity to support the theme. Check that details and important objects remain visible."
      ]
    ],
    "code": "<a-sphere color=\"white\" roughness=\"0.25\"\n  wireframe=\"false\"\n  src=\"/resources/projects/materials-and-textures/ball.jpg\">\n</a-sphere>\n<a-light type=\"ambient\" intensity=\"0.5\"></a-light>",
    "challenge": "Create two atmospheres for the same scene. Change textures or lighting, then choose the version that best supports your theme.",
    "evidence": "Two screenshots and a reason for choosing one atmosphere.",
    "submitEvidence": "BSD link showing two atmospheres (describe how versions A and B differ) + a reason for choosing one.",
    "submitExample": "Example: Version A uses a grass texture and bright light (intensity 1). Version B uses dim blue light (intensity 0.4). I chose version B because my theme is a calm night garden.",
    "summary": [
      "Textures affect surface appearance.",
      "Lighting affects visibility and atmosphere.",
      "Visual choices should support the theme, rather than simply adding effects."
    ],
    "reflection": "Which visual change best helped people understand your scene’s atmosphere?",
    "times": [
      [
        "Opening quiz & comparison",
        8
      ],
      [
        "Texture a starter scene",
        25
      ],
      [
        "Demonstrate & modify basic lighting",
        25
      ],
      [
        "Compare two versions",
        12
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Prepare texture assets before class. Discuss visibility as well as appearance. Assess students’ reasoning, not the teacher’s color preference.",
    "questions": [
      [
        "The image is set through src, but wireframe=\"true\" remains. How can you show the textured surface?",
        [
          "Disable wireframe and check the image address",
          "Only change the camera position",
          "Only rename the object"
        ],
        0,
        "Wireframe displays the object’s edges; the BSD textured surface uses wireframe false."
      ],
      [
        "The scene has a night theme, but the main target is dark. Which improvement is best?",
        [
          "Increase fog without testing",
          "Adjust the target’s lighting and test visibility",
          "Change to a daytime theme without comparison"
        ],
        1,
        "Keep the design purpose while improving visibility and comparing results."
      ],
      [
        "What evidence supports your lighting choice?",
        [
          "The largest number of lights",
          "All lights use the same intensity",
          "Two compared versions and a reason for choosing one"
        ],
        2,
        "Comparison and reasoning connect visuals to the purpose."
      ]
    ],
    "openingQuestions": [
      [
        "position=\"0 2 -3\" places the object at a height of…",
        [
          "0",
          "-3",
          "2"
        ],
        2,
        "Y is the second coordinate and controls height."
      ],
      [
        "Which attribute changes a light/model’s orientation?",
        [
          "rotation",
          "color",
          "src"
        ],
        0,
        "rotation controls orientation rather than location or color."
      ],
      [
        "Why group parts under one parent?",
        [
          "Every part automatically gets a texture",
          "You can move the whole group together",
          "All parts turn into one image"
        ],
        1,
        "The parent’s transformation affects its children."
      ]
    ],
    "bsdFocus": [
      "A-Frame Image Textures: focus on Apply a texture (step 8) in a prepared scene: image src, color white, and wireframe false.",
      "A-Frame Lighting and Fog: select basic lighting only. Fog, texture repetition, and advanced variations are extensions."
    ],
    "preparation": "Prepare BSD images or accessible class assets and a scene with starter lights. Completing both full projects is not the target for 80 minutes.",
    "minimumTarget": "One textured surface and two lighting versions to compare, with an explanation of the choice.",
    "support": "Provide asset addresses rather than asking students to search for images during class. If progress is slow, demonstrate lighting and have students change one intensity.",
    "exitQuestion": "Your scene has a night theme, but the target is hard to see. What lighting change will you test, and what evidence would show it helps?",
    "exitExpected": "Suggest an adjustment that keeps the theme and check whether users can see/find the target more easily.",
    "brief": {
      "mainGoal": "Use textures and lighting to create an atmosphere that supports the theme and keeps important objects visible.",
      "material": [
        "A texture is an image applied to an object’s surface. Its address must load; the BSD textured-surface activity uses wireframe false.",
        "Lighting affects atmosphere and visibility. Compare two versions using basic lighting; fog and advanced settings are extensions."
      ],
      "why": "Visitors need to understand the atmosphere and find important objects in your world.",
      "tasks": [
        "Apply one texture to the starter scene using a prepared asset.",
        "Adjust lighting to create two atmospheres and save screenshots of both.",
        "Choose the version that supports the theme, explain your reasoning, and complete the quiz and exit ticket."
      ],
      "success": [
        "A textured surface is visible.",
        "Two lighting versions can be compared in screenshots.",
        "You can justify the atmosphere and show that important objects remain visible."
      ],
      "wka": {
        "principle": "Considering other people’s needs guides our decisions, including visual design.",
        "reference": "Philippians 2:4",
        "url": "https://www.bible.com/bible/111/PHP.2.4.NIV",
        "practice": "Check whether a partner can see important objects before choosing the final visuals.",
        "question": "Does your lighting help visitors understand the scene?"
      },
      "teacherScript": "Today we will create atmosphere through textures and lighting. Apply an image to a surface, then compare two lighting versions. Save both and explain which one supports your theme. Important objects should remain visible. As designers, we consider visitors’ needs and check whether our choices help them."
    }
  },
  {
    "id": 4,
    "title": "Bring assets into your world",
    "subtitle": "Import a model, adjust its scale, and credit its source.",
    "tag": "Assets",
    "label": "Third-party models",
    "lab": "scale",
    "prompt": "If your imported model is larger than the whole park, what should you check?",
    "bsd": [
      "Import Third-Party Models into A-Frame"
    ],
    "scope": "Choose one model from Poly Pizza (poly.pizza). No login, download, or upload is needed; just copy the .glb file link.",
    "goals": [
      "Import a third-party model.",
      "Adjust its size and position.",
      "Record its creator, source, and usage permissions."
    ],
    "concepts": [
      [
        "A model is an asset",
        "A 3D model needs an accessible address. On Poly Pizza the model file link is in the page source: press Ctrl + U, search .glb with Ctrl + F, and copy the https://static.poly.pizza/....glb link (not the one ending in .glb.br). Sketchfab or Google Drive page links cannot be used as src."
      ],
      [
        "Size differs from position",
        "scale changes size along X Y Z. position sets location. An invisible model has not necessarily failed to load."
      ],
      [
        "Credit the model’s origin",
        "Record its title, creator if available, source link, and usage terms. Using someone else’s model still requires your own design decisions."
      ]
    ],
    "code": "<a-scene>\n  <a-assets>\n    <!-- .glb link from Poly Pizza -->\n    <a-asset-item id=\"model1\"\n      src=\"https://static.poly.pizza/412f5303-86bc-48b2-aaeb-99393c0a4004.glb\">\n    </a-asset-item>\n  </a-assets>\n  <a-gltf-model src=\"#model1\" position=\"0 0 -4\" scale=\"1 1 1\"></a-gltf-model>\n  <!-- 1-metre comparison cube -->\n  <a-box position=\"-2 0.5 -4\" color=\"orange\"></a-box>\n</a-scene>",
    "challenge": "Display one Poly Pizza model at a sensible size compared with a 1-metre cube. Record its source (title, creator, page link, licence), then explain one problem and the checks you performed.",
    "evidence": "A visible, appropriately sized Poly Pizza model, source information, and an explanation of a problem.",
    "submitEvidence": "BSD link to an appropriately sized Poly Pizza model + source information + an explanation of a problem and your checks.",
    "submitExample": "Example: I used Chair by Quaternius (poly.pizza/m/iMNqRzPwwe, CC0 licence). After Run the chair was not visible. I checked that the link ends in .glb and that the id matches src. The chair was tiny, so I changed scale to 100 100 100 until it was about as tall as the 1-metre cube.",
    "summary": [
      "Asset addresses must be accessible.",
      "scale changes size; position changes location.",
      "Credit the source and check permissions for third-party models."
    ],
    "reflection": "How can you tell whether a model failed to load or is simply at an unsuitable position or size?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Import & source demonstration",
        10
      ],
      [
        "Guided model import",
        32
      ],
      [
        "Scale, position & testing",
        20
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Demonstrate how to get a .glb link from Poly Pizza (Ctrl + U, search .glb). Prepare a backup link list in case Ctrl + U is blocked. Do not assess students by model complexity.",
    "questions": [
      [
        "A model is too large but correctly positioned. Which attribute should change first?",
        [
          "position",
          "scale",
          "rotation"
        ],
        1,
        "scale changes size; position changes location."
      ],
      [
        "The room asset has been preloaded with id=\"room\". Which BSD element displays it?",
        [
          "<a-gltf-model src=\"#room\"></a-gltf-model>",
          "<a-assets src=\"#room\"></a-assets>",
          "<a-light src=\"#room\"></a-light>"
        ],
        0,
        "a-asset-item preloads the asset; a-gltf-model displays the referenced model."
      ],
      [
        "A free model has no clear usage terms. What should you do?",
        [
          "Assume every free asset can be used freely",
          "List yourself as the creator",
          "Check the source terms or use a teacher asset with clear permissions"
        ],
        2,
        "A price of zero does not establish usage permission."
      ]
    ],
    "openingQuestions": [
      [
        "A texture image needs…",
        [
          "An accessible src address",
          "A long project name",
          "A rotation of zero"
        ],
        0,
        "src points to the image; an incorrect address prevents loading."
      ],
      [
        "After reducing light intensity, what should you test?",
        [
          "Whether the title changed",
          "Whether important objects are still visible",
          "Whether the model has a new name"
        ],
        1,
        "Lighting choices should keep important objects visible."
      ],
      [
        "Which attribute can apply a texture to an object?",
        [
          "rotation",
          "position",
          "src"
        ],
        2,
        "src can refer to the texture image."
      ]
    ],
    "bsdFocus": [
      "Import Third-Party Models into A-Frame: a-assets, a-asset-item, and id (steps 2–4), then a-gltf-model to display room (step 5).",
      "Make one scale/position modification. The plant, spotlight, and full shadow setup are extensions."
    ],
    "preparation": "Test several Poly Pizza .glb links in the BSD sandbox and prepare a backup list with clear licences (CC0/CC BY).",
    "minimumTarget": "One Poly Pizza model is visible with sensible proportions compared with a 1-metre cube; its source and licence are recorded.",
    "support": "If the model does not appear: check the link ends in .glb (not .glb.br), check the id matches src, then try scale 10 10 10 or 0.1 0.1 0.1 and check position. If Ctrl + U is blocked, use a link from the teacher list.",
    "exitQuestion": "The room asset is loaded but invisible. Write the element that displays it and name two further checks.",
    "exitExpected": "Use a-gltf-model src=\"#room\"; explain checks for matching id/address, position, scale, or camera.",
    "brief": {
      "mainGoal": "Display a third-party model, adjust its proportions, and record its source and usage terms.",
      "material": [
        "A model can be preloaded inside a-assets using an a-asset-item with an id. An a-gltf-model element then displays the model by referring to that id.",
        "Loading an asset does not automatically display it. Check the reference, camera, position, and scale. scale changes size; position changes location."
      ],
      "why": "Existing assets help development, but choosing, placing, and crediting them remains your responsibility.",
      "tasks": [
        "Load and display a tested BSD or teacher-provided model.",
        "Adjust scale and position for sensible proportions, then test the view.",
        "Record the title, creator if available, source link, and usage terms; explain a check you performed."
      ],
      "success": [
        "The model is visible with appropriate proportions.",
        "You can distinguish preloading an asset from displaying a model.",
        "You record sources and permissions without claiming someone else’s asset as your own."
      ],
      "wka": {
        "principle": "Truthfulness shapes how we explain the origin of a creation.",
        "reference": "Ephesians 4:25",
        "url": "https://www.bible.com/bible/111/EPH.4.25.NIV",
        "practice": "Credit the creator and source, and explain what you built or adapted yourself.",
        "question": "How does your source record demonstrate honesty?"
      },
      "teacherScript": "Today we will bring an existing model into our scene. We will distinguish loading an asset from displaying it, then adjust size and position. Display one model, make its proportions sensible, and credit its source. Be ready to explain a check you used when it did not work. We will also be honest about which parts came from someone else."
    }
  },
  {
    "id": 5,
    "title": "A world that responds",
    "subtitle": "Build a gaze interaction and explain how it works.",
    "tag": "Interaction",
    "label": "Gaze interaction",
    "lab": "gaze",
    "prompt": "How does a visitor know that an object can be interacted with?",
    "bsd": [
      "A-Frame Gaze Interactions"
    ],
    "scope": "Create one gaze response with a teacher-provided JavaScript component. Basic components/events are core content; full custom-component and animation projects are extensions.",
    "goals": [
      "Explain an interaction’s trigger and response.",
      "Create a simple gaze interaction following BSD.",
      "Explain the flow trigger → listener → function → response."
    ],
    "concepts": [
      [
        "Trigger, then response",
        "An interaction has a triggering event, such as gazing at a target, and a response the user can observe."
      ],
      [
        "Users need cues",
        "The target should be visible. Give instructions and feedback that help users recognize a successful action."
      ],
      [
        "Cursor and listener work together",
        "The camera contains a fuse cursor. A component on the target registers a click listener; its callback determines the response. Learn this structure with teacher-provided starter code."
      ]
    ],
    "code": "<!-- A simple adaptation, not the complete BSD project. -->\n<!-- Load A-Frame, then register this component before the scene. -->\n<script>\nAFRAME.registerComponent(\"ubah-warna\", {\n  init: function () {\n    const target = this.el;\n    target.addEventListener(\"click\", function () {\n      target.setAttribute(\"color\", \"green\");\n    });\n  }\n});\n</script>\n<a-scene>\n  <a-camera><a-cursor fuse=\"true\" fuse-timeout=\"1500\"></a-cursor></a-camera>\n  <a-box ubah-warna position=\"0 1.6 -3\" color=\"yellow\"></a-box>\n</a-scene>",
    "challenge": "",
    "evidence": "A working gaze interaction + an explanation of its trigger and response.",
    "submitEvidence": "BSD link to a working gaze interaction + an explanation of the trigger, listener, and response.",
    "submitExample": "Example: The box changes colour after it is gazed at for 1 second. The trigger is the fuse cursor’s gaze, the click listener calls the changeColour function, and the response turns the box red.",
    "summary": [
      "An interaction has a trigger and a response.",
      "An event listener connects an event to a response function.",
      "Targets and responses should be easy for users to see."
    ],
    "reflection": "Which part of the trigger → listener → response flow was hardest to understand, and how did you test it?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Trigger & response demonstration",
        10
      ],
      [
        "Gaze with starter code",
        32
      ],
      [
        "Partner test & improvement",
        20
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Ask students to identify the trigger, response, and evidence of success. Independent user testing is more useful than the creator demonstrating every step.",
    "questions": [
      [
        "A fuse cursor points at a button, then the button changes color. Identify the trigger and response.",
        [
          "Color is the trigger; gaze is the response",
          "Sustained gaze is the trigger; color change is the response",
          "The file name is the trigger; the camera is the response"
        ],
        1,
        "An interaction connects a triggering event with an observable change."
      ],
      [
        "What does button.addEventListener(\"click\", startAnim) do?",
        [
          "Connects the button’s click event to startAnim",
          "Changes every object automatically without a function body",
          "Creates a new camera"
        ],
        0,
        "The listener calls the function when the event occurs; its body defines the response."
      ],
      [
        "The button works, but users cannot find it without help. What should you do?",
        [
          "Add decoration before testing",
          "Only explain verbally during demonstrations",
          "Clarify the target/instructions and retest without help"
        ],
        2,
        "Visitors need to discover and use the target themselves."
      ]
    ],
    "openingQuestions": [
      [
        "scale=\"0.5 0.5 0.5\" changes…",
        [
          "The model’s location to the left",
          "The model’s size to half along all axes",
          "The model’s color to dark"
        ],
        1,
        "scale controls size, not location or color."
      ],
      [
        "The asset is in <a-assets>, but invisible. What else is needed?",
        [
          "A page title",
          "Removing all lights",
          "A scene model element that references the asset"
        ],
        2,
        "Preloading an asset does not automatically display it."
      ],
      [
        "Recording asset sources helps you…",
        [
          "Trace the creator and usage terms",
          "Replace the camera function",
          "Set model coordinates"
        ],
        0,
        "Source records support responsible use of assets."
      ]
    ],
    "bsdFocus": [
      "A-Frame Gaze Interactions: camera, fuse cursor, basic custom component, and click event (steps 2–6) bridge the concepts.",
      "Provide a starter component. Students change one color response and test it. The complete press/release animations and color array are extensions."
    ],
    "preparation": "Prepare working camera/cursor/target HTML and component JavaScript. Load A-Frame first, register the component next, then create the scene. Test on student devices.",
    "minimumTarget": "Gaze causes one visible change; the student explains the listener and modifies the response.",
    "support": "Do not require beginners to write all 14 steps from scratch. If events/variables need support, read the code together and have students change and explain the response color.",
    "exitQuestion": "For your interaction, name the trigger, the function called, and the visible response.",
    "exitExpected": "Connect gaze/fuse → click listener → response function → an observable visual change.",
    "brief": {
      "mainGoal": "Create a gaze interaction with a visible response and explain how it works.",
      "material": [
        "An interaction has a trigger and a response. A fuse cursor inside the camera can activate a target after the gaze stays on it for a set duration.",
        "A JavaScript component registers an event listener on the target. The listener connects an event to a response function, such as a color change. Use the teacher’s starter code, understand the flow, and modify the response."
      ],
      "why": "A responsive world gives visitors something to do, so its targets and instructions need to be understandable.",
      "tasks": [
        "Run the teacher-provided camera, cursor, target, and starter component.",
        "Modify a response and explain the trigger, listener, and response function.",
        "Ask a partner to try without verbal help; record one difficulty and make one improvement."
      ],
      "success": [
        "Gazing at the target triggers a visible change.",
        "You can explain trigger → listener → function → response.",
        "The response you changed works when tested."
      ],
      "wka": {
        "principle": "Care for others includes considering their experience of our creations.",
        "reference": "Philippians 2:4",
        "url": "https://www.bible.com/bible/111/PHP.2.4.NIV",
        "practice": "Improve targets and instructions using your partner’s testing difficulties.",
        "question": "What could you change to make the interaction easier for someone else?"
      },
      "teacherScript": "Today our scene will begin responding to users. We will learn about gaze triggers, event listeners, and response functions through starter code. Change one response, test it, and explain the flow to me. Care for others becomes visible in targets and responses that other people can understand."
    }
  },
  {
    "id": 6,
    "title": "Final project: your own VR diorama",
    "subtitle": "Plan, build, and submit your VR diorama in the BSD Sandbox.",
    "tag": "Final project",
    "label": "Final project: Diorama",
    "lab": "plan",
    "prompt": "What is one experience you want to give visitors to your diorama?",
    "bsd": [
      "Final Project: Diorama",
      "Sandbox"
    ],
    "scope": "One independent diorama that uses lessons 1–5. Work on it until your teacher’s deadline.",
    "goals": [
      "Decide on a theme and what visitors will do.",
      "Build the diorama in Sandbox using shapes, textures, lighting, models, and interaction.",
      "Check that every feature works, then submit the final version."
    ],
    "concepts": [
      [
        "Begin with a purpose",
        "Identify the visitors and what they will see or do. Choose objects and features that support that experience."
      ],
      [
        "Build the minimum version",
        "Prioritize a combined model, textures, lighting, and one interaction. Add extras after the minimum version works."
      ],
      [
        "Plans can develop",
        "A sketch need not be perfect. Use it as a guide and record changes and reasons while building."
      ],
      [
        "Save and test every step",
        "Add one feature, run it, and check the result before adding the next. Problems are easier to find when changes are small."
      ]
    ],
    "code": "Short plan:\nTheme: ____________________\nVisitors will: ____________________\nMy own model: ____________________\nMain interaction: ____________________\nAssets and sources: ____________________",
    "challenge": "",
    "evidence": "Final diorama in Sandbox + theme and feature list + asset source notes.",
    "submitEvidence": "BSD link to the final diorama + theme and what visitors do + feature list + third-party asset sources (if any).",
    "submitExample": "Example: Theme: school garden. Visitors gaze at plants to see their names. Features: plants made of boxes and spheres, a textured path, evening light, a Poly Pizza tree model (Tree by Kenney, CC0), and a gaze interaction.",
    "summary": [
      "A diorama starts from a theme and a visitor action.",
      "Finish the minimum features first, extras later.",
      "Test every change and record asset sources."
    ],
    "reflection": "Which part of your diorama are you most proud of, and what would you improve with more time?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Brief & rubric",
        7
      ],
      [
        "Theme, sketch & minimum features",
        20
      ],
      [
        "Teacher planning check",
        10
      ],
      [
        "Start the diorama in Sandbox",
        25
      ],
      [
        "Formative quiz & next target",
        10
      ]
    ],
    "teacher": "Check that the theme and features are realistic before students build. Share the final-project rubric. Students may use BSD references but must explain how they adapted them.",
    "questions": [
      [
        "Visitors should find a plant and activate an information button. Which features come first?",
        [
          "Sound effects on every object",
          "The plant, a clear target, and an information response",
          "As many downloaded models as possible"
        ],
        1,
        "Priorities follow the chosen visitor experience."
      ],
      [
        "The plan is too large for the time left. What should you do?",
        [
          "Reduce extras and complete the minimum version",
          "Keep adding features and postpone testing",
          "Change the theme every lesson"
        ],
        0,
        "Reduce scope so core features can be completed and tested."
      ],
      [
        "You move the target in the sketch after teacher feedback. What should you record?",
        [
          "Only the original sketch",
          "The final result without notes",
          "The initial sketch, change, and reasoning"
        ],
        2,
        "Evidence shows development and reasons for revision."
      ]
    ],
    "openingQuestions": [
      [
        "In gaze interaction, the trigger is…",
        [
          "The user looking at the target for the set duration",
          "The teacher opening the gradebook",
          "The creator changing the title"
        ],
        0,
        "A fuse cursor can activate a target after a sustained gaze."
      ],
      [
        "Which response helps the user?",
        [
          "More code without a visible change",
          "The target changes appearance after activation",
          "The file name is hidden"
        ],
        1,
        "An observable response shows that an action worked."
      ],
      [
        "With limited time, which feature comes first?",
        [
          "Every sound effect",
          "The most complex downloaded model",
          "A testable core experience"
        ],
        2,
        "Build the minimum version before adding extras."
      ]
    ],
    "bsdFocus": [
      "Final Project: Diorama is the reference; students build their own version in Sandbox.",
      "Lesson 1–5 projects may be used as references, then adapted to the student’s theme."
    ],
    "preparation": "Share the final-project rubric early, with an example of asset source notes. Decide whether work is individual or in groups; understanding is still checked per student.",
    "minimumTarget": "A clearly themed diorama with a composite object, texture, lighting, one third-party model, and one working interaction.",
    "support": "Cut features that do not support the theme. For group work, record each student’s contribution.",
    "exitQuestion": "Name one visitor action in your diorama and the feature that supports it.",
    "exitExpected": "Theme, visitor action, and features are connected; asset sources are recorded.",
    "brief": {
      "mainGoal": "Create one clearly themed VR diorama in the BSD Sandbox using lessons 1–5, then submit the final version.",
      "material": [
        "A diorama is a small world that communicates a theme or experience. Start from the visitor: what will they see or do?",
        "The minimum version includes your own composite object, texture, lighting, one third-party model with its source recorded, and one interaction. Extra features come after everything works."
      ],
      "why": "The final project shows that you can use everything you learned to create your own work.",
      "tasks": [
        "Write your theme, intended visitors, and one main experience.",
        "Sketch the layout, list minimum features and asset sources, and review feasibility with the teacher.",
        "Start a Sandbox scene and set your next building target."
      ],
      "success": [
        "The theme and visitor action are clear.",
        "The minimum features run without errors in Sandbox.",
        "Third-party asset sources are recorded and the final link is submitted."
      ],
      "wka": {
        "principle": "Cultivating and caring for creation guides responsible use of resources.",
        "reference": "Genesis 2:15",
        "url": "https://www.bible.com/bible/111/GEN.2.15.NIV",
        "practice": "Choose a theme that values creation and plan responsible use of time and assets.",
        "question": "What would your diorama help visitors understand or care about?"
      },
      "teacherScript": "From today you will work on the final project: your own VR diorama. Decide on a theme and what visitors will do, then build it in Sandbox using the shapes, textures, lighting, models, and interaction we have learned. Submit the link to your final version with the form before the deadline. Caring for creation helps us use time and assets responsibly."
    }
  }
];
const RUBRIC = [
  {
    "name": "Function & reliability",
    "max": 20,
    "descriptors": [
      "Most core features do not work yet.",
      "Some core features work, but problems disrupt use.",
      "Most core features work; minor issues remain.",
      "All core features work consistently and have been tested."
    ]
  },
  {
    "name": "Application of A-Frame",
    "max": 20,
    "descriptors": [
      "Concept application is limited or has many errors.",
      "Some concepts are applied correctly; structure needs improvement.",
      "Core concepts are applied correctly and the code is reasonably organized.",
      "Concepts are applied correctly, clearly, and appropriately for the project."
    ]
  },
  {
    "name": "Design & user experience",
    "max": 15,
    "descriptors": [
      "The theme, layout, or interaction is difficult to understand.",
      "The theme is emerging; some parts confuse users.",
      "The theme is clear; the layout and interaction are generally understandable.",
      "The theme, layout, visuals, and interaction support a clear experience."
    ]
  },
  {
    "name": "Process & revision",
    "max": 15,
    "descriptors": [
      "Planning, testing, or revision evidence is very limited.",
      "Some process evidence is present; revision reasoning is unclear.",
      "Planning, testing, and an explained revision are present.",
      "Process evidence is complete; revisions are focused and retested."
    ]
  }
];

// Concise classroom tasks; original practice banks remain available as optional revision.
const CLASSROOM_TASKS = [
  {
    "steps": [
      "Open Explore “Code Your Own World with VR”. Try the sample world.",
      "Open Set up A-Frame. Run a scene with one object.",
      "Change the object’s colour and run it again."
    ],
    "challenge": "Add a second object in a different colour. Point to the code for its colour and position.",
    "result": "Two objects in a scene + explain one attribute."
  },
  {
    "steps": [
      "Open A-Frame Modeling. Try position, rotation, and grouping in the DNA model.",
      "Group several shapes under one parent entity.",
      "Run the scene and move the parent."
    ],
    "challenge": "Build a tree, chair, or table. Move or rotate it through its parent.",
    "result": "A grouped model + demonstrate a position or rotation change."
  },
  {
    "steps": [
      "Open A-Frame Image Textures. Apply one texture to the starter scene.",
      "Open A-Frame Lighting and Fog. Try basic lighting.",
      "Save images before and after changing the light."
    ],
    "challenge": "Create two moods. Choose one for your theme and give one reason.",
    "result": "Two screenshots + a reason for your choice."
  },
  {
    "steps": [
      "Open Import Third-Party Models into A-Frame in BSD. Learn a-assets, a-asset-item, and a-gltf-model.",
      "Open poly.pizza, search for one model (for example bed, chair, tree), and click it. Note its title, creator, licence, and page link.",
      "Get the model file link: press Ctrl + U, press Ctrl + F and type .glb, then copy the https://static.poly.pizza/....glb link (not the one ending in .glb.br). No login or Download click is needed.",
      "In the BSD sandbox, paste the link into <a-asset-item id=\"model1\" src=\"...\">, display it with <a-gltf-model src=\"#model1\">, and add a 1-metre <a-box> for comparison.",
      "Change scale and position until the model has a sensible size and stands on the floor."
    ],
    "challenge": "Display one Poly Pizza model at a sensible size compared with a 1-metre cube. Record its source and explain one problem and your checks.",
    "result": "A visible Poly Pizza model + source information + one explained problem."
  },
  {
    "steps": [
      "Open A-Frame Gaze Interactions using the teacher’s starter code.",
      "Run the camera, cursor, and target.",
      "Change the colour response. Test it by gazing at the target."
    ],
    "challenge": "",
    "result": "A working gaze interaction + an explanation of its trigger and response."
  },
  {
    "steps": [
      "Open Final Project: Diorama in BSD. Choose a theme and decide one thing visitors will do.",
      "List the minimum features: composite shapes, texture & lighting, one third-party model, and one interaction.",
      "Build your diorama in the BSD Sandbox. Run it every time you add a feature.",
      "Make sure every feature works, record your asset sources, then save the final version.",
      "Submit the link to your final diorama with the form below."
    ],
    "challenge": "",
    "result": "Final diorama + theme & feature list + asset source notes."
  }
];
const CLASSROOM_TIMES = [[["Quick demo & goal",5],["Explore a VR example",10],["First scene & challenge",55],["Show results & reflect",10]],[["Quick demo & target",5],["Guided modeling",30],["Modify your model",35],["Show results & reflect",10]],[["Quick demo & target",5],["Texture the starter scene",25],["Basic lighting",25],["Compare two versions",15],["Show results & reflect",10]],[["Import demo & sources",10],["Guided model import",35],["Scale, position & test",25],["Show results & reflect",10]],[["Trigger & response demo",10],["Gaze with starter code",40],["Change the response & test",20],["Show results & reflect",10]],[["Brief & rubric",10],["Theme & feature list",15],["Build in Sandbox",45],["Save & show progress",10]]];
LESSONS.forEach((lesson,index)=>{lesson.classroom=CLASSROOM_TASKS[index];lesson.times=CLASSROOM_TIMES[index];lesson.brief.tasks=lesson.classroom.steps;});
LESSONS[0].brief.teacherScript="Today we will build our first VR scene. Open the two listed BSD sections, run one object, then change its colour. Your challenge is to add a second object in a different colour. Show me the result and the code for one attribute.";
