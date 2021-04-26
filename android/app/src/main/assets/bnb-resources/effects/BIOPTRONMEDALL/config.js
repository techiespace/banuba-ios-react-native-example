function Effect() {
    var self = this;

    this.meshes = [
        { file: "BeautyFaceSP_Optimased.bsm2", anims: [
                                { a: "Take 001", t: 3333 },
                        ],

                is_physics_applied: "False".toLowerCase() === true
        },
        { file: "Earring_02.bsm2", anims: [
                                { a: "Take 001", t: 966 },
                        ],

                is_physics_applied: "False".toLowerCase() === true
        },
        { file: "Earring_03.bsm2", anims: [
                                { a: "Take 001", t: 966 },
                        ],

                is_physics_applied: "False".toLowerCase() === true
        },
    ];

    this.play = function() {
        var now = (new Date()).getTime();
        for(var i = 0; i < self.meshes.length; i++) {
                if(now > self.meshes[i].endTime) {
                        self.meshes[i].animIdx = (self.meshes[i].animIdx + 1)%self.meshes[i].anims.length;
                        if (!self.meshes[i].is_physics_applied) {
                                Api.meshfxMsg("animOnce", i, 0, self.meshes[i].anims[self.meshes[i].animIdx].a);
                        }
                        self.meshes[i].endTime = now + self.meshes[i].anims[self.meshes[i].animIdx].t;
                }
        }

        // if(isMouthOpen(world.landmarks, world.latents)) {
        //  Api.hideHint();
        // }
    };

    this.init = function() {
        Api.meshfxMsg("spawn", 3, 0, "!glfx_FACE");

        Api.meshfxMsg("spawn", 0, 0, "BeautyFaceSP_Optimased.bsm2");
        // Api.meshfxMsg("animOnce", 0, 0, "Take 001");

        Api.meshfxMsg("spawn", 1, 0, "Earring_02.bsm2");
        // Api.meshfxMsg("animOnce", 1, 0, "Take 001");

        Api.meshfxMsg("spawn", 2, 0, "Earring_03.bsm2");
        // Api.meshfxMsg("animOnce", 2, 0, "Take 001");















        for(var i = 0; i < self.meshes.length; i++) {
            self.meshes[i].animIdx = -1;
            self.meshes[i].endTime = 0;
        }
        self.faceActions = [self.play];

        // Api.showHint("Open mouth");

        Api.showRecordButton();
    };

    this.restart = function() {
        Api.meshfxReset();


        self.init();
    };

    this.faceActions = [];
    this.noFaceActions = [];

    this.videoRecordStartActions = [];
    this.videoRecordFinishActions = [];
    this.videoRecordDiscardActions = [this.restart];
}

configure(new Effect());