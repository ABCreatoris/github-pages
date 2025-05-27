import os
import requests
from pathlib import Path
import frontmatter
import hashlib
from urllib.parse import quote

def download_image(url, save_path):
    """下载图片并保存到指定路径"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"成功下载图片: {save_path}")
        return True
    except Exception as e:
        print(f"下载图片失败: {url}, 错误: {str(e)}")
        return False

def get_image_url(title):
    """根据标题生成图片URL"""
    # 使用标题生成一个固定的种子值
    seed = hashlib.md5(title.encode()).hexdigest()[:8]
    return f"https://picsum.photos/seed/{seed}/800/400"

def process_posts():
    """处理所有文章并下载相关图片"""
    # 确保图片目录存在
    images_dir = Path("assets/images")
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # 获取所有文章
    posts_dir = Path("_posts")
    for post_file in posts_dir.glob("*.md"):
        try:
            # 读取文章内容
            with open(post_file, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            # 获取文章标题和当前图片路径
            title = post['title']
            current_image = post.get('image', '')
            
            # 如果已有本地图片，删除原有图片
            if current_image and current_image.startswith('/assets/images/'):
                old_image_path = images_dir / Path(current_image).name
                if old_image_path.exists():
                    old_image_path.unlink()
                    print(f"删除原有图片: {old_image_path}")
            
            # 生成新图片文件名
            image_name = f"{post_file.stem}.jpg"
            image_path = images_dir / image_name
            
            # 下载新图片
            image_url = get_image_url(title)
            if download_image(image_url, image_path):
                # 更新文章中的图片路径
                post['image'] = f"/assets/images/{image_name}"
                
                # 保存更新后的文章
                with open(post_file, 'w', encoding='utf-8') as f:
                    f.write(frontmatter.dumps(post))
                print(f"更新文章图片路径: {title}")
            
        except Exception as e:
            print(f"处理文章失败: {post_file}, 错误: {str(e)}")

if __name__ == "__main__":
    process_posts() 