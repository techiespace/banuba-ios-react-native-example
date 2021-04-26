import android.Manifest
import android.content.Context
import android.graphics.Color
import android.net.Uri
import android.view.SurfaceView
import com.banuba.sdk.effect_player.Effect
import com.facebook.react.uimanager.SimpleViewManager
import com.banuba.sdk.manager.BanubaSdkManager
import com.banuba.sdk.manager.BanubaSdkTouchListener
import com.facebook.react.uimanager.ThemedReactContext // package  live.streamstyle;
import com.facebook.react.uimanager.annotations.ReactProp
import expo.modules.av.video.VideoView
import live.streamstyle.MainActivity

class BanubaTryOnViewManager : SimpleViewManager<SurfaceView>() {
//    private val banubaSdk: BanubaSdkManager? = null
    private var effect: Effect? = null
    private lateinit var context: Context
    override fun getName(): String {
        return REACT_CLASS
    }
    companion object {
        private var MASK_NAME = "UnluckyWitch"

        private const val REQUEST_CODE_APPLY_MASK_PERMISSION = 1001
        const val REACT_CLASS = "BanubaTryOnView"
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
    }
    private val banubaSdkManager by lazy(LazyThreadSafetyMode.NONE) {
        BanubaSdkManager(context)
    }
    private val maskUri by lazy(LazyThreadSafetyMode.NONE) {
         Uri.parse(BanubaSdkManager.getResourcesBase())
                 .buildUpon()
                 .appendPath("effects")
                 .appendPath(MASK_NAME)
                 .build()
    }

    override fun createViewInstance(reactContext: ThemedReactContext): SurfaceView {
        context = reactContext
        val videoView = SurfaceView(reactContext)
        videoView.setOnTouchListener(BanubaSdkTouchListener(reactContext, banubaSdkManager.effectPlayer))
        banubaSdkManager.attachSurface(videoView)
        banubaSdkManager.openCamera()
        effect = banubaSdkManager.effectManager.loadAsync((maskUri).toString())
        banubaSdkManager.effectPlayer.playbackPlay()
        //    videoView.setOnTouchListener(new BanubaSdkTouchListener(reactContext, banubaSdk.getEffectPlayer()));
        return videoView
    } 
      @ReactProp(name="productName")
      fun setVideoPath(videoView: SurfaceView, urlPath: String) {
        MASK_NAME = urlPath
        effect = banubaSdkManager.effectManager.loadAsync(Uri.parse(BanubaSdkManager.getResourcesBase())
                 .buildUpon()
                 .appendPath("effects")
                 .appendPath(urlPath)
                 .build().toString())
      }
}