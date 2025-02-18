import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Code2, Database, Cpu } from 'lucide-react';

const SkillCard = ({ category, skills, index, icon: Icon, position }) => {
    const [isHovered, setIsHovered] = useState(false);
    const contentRef = useRef(null);
    const controls = useAnimation();
  
    // Handle scroll animation
    useEffect(() => {
      const animateScroll = async () => {
        if (!contentRef.current) return;
  
        const containerHeight = 152;
        const fullContentHeight = contentRef.current.scrollHeight;
        const scrollDistance = fullContentHeight - containerHeight;
  
        if (isHovered && scrollDistance > 0) {
          await controls.start({
            y: -scrollDistance,
            transition: {
              duration: 2,
              ease: "easeOut"
            }
          });
        } else {
          await controls.start({
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeIn"
            }
          });
        }
      };
  
      animateScroll();
    }, [isHovered, controls]);
  
    // Define positions for each card
    const positions = {
      right: {
        className: "absolute right-10 top-1/2 -translate-y-1/2 transform rotate-2",
        style: { zIndex: 10 }
      },
      bottomLeft: {
        className: "absolute left-10 bottom-48 transform -rotate-2",
        style: { zIndex: 10 }
      }
    };
  
    const currentPosition = positions[position];
  
    return (
      <div
        className={`w-72 h-[240px] group ${currentPosition.className}`}
        style={currentPosition.style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          initial={{ opacity: 0, x: position === 'right' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
          style={{
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Rest of the card content remains the same */}
          <motion.div 
            className="p-6 border-b border-white/30"
            style={{
              backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon className="w-5 h-5 text-gray-700" 
                  style={{ 
                    opacity: isHovered ? 0.9 : 0.7,
                    transition: 'all 0.3s ease'
                  }} 
                />
              </motion.div>
              <h3 
                className="font-medium tracking-wide text-sm text-gray-700"
                style={{ 
                  opacity: isHovered ? 0.9 : 0.7,
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </h3>
            </div>
          </motion.div>
  
          <div className="relative h-[152px] overflow-hidden">
            <motion.div
              ref={contentRef}
              animate={controls}
              initial={{ y: 0 }}
              className="absolute w-full"
              style={{
                willChange: 'transform'
              }}
            >
              {skills.slice(0, 3).map((skill, idx) => (
                <div 
                  key={idx}
                  className="relative"
                  style={{
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="px-6 py-4 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-1.5 h-1.5 rounded-full bg-gray-600"
                        style={{ 
                          opacity: isHovered ? 0.7 : 0.4,
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <span 
                        className="text-sm text-gray-700"
                        style={{ 
                          opacity: isHovered ? 0.9 : 0.6,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {skill}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
  
              {skills.slice(3).map((skill, idx) => (
                <div 
                  key={idx + 3}
                  className="relative"
                  style={{
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="px-6 py-4 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-1.5 h-1.5 rounded-full bg-gray-600"
                        style={{ 
                          opacity: isHovered ? 0.7 : 0.4,
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <span 
                        className="text-sm text-gray-700"
                        style={{ 
                          opacity: isHovered ? 0.9 : 0.6,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {skill}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
  
            {!isHovered && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)'
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    );
  };
  
  const SkillCards = () => {
    const skillCategories = [
      {
        category: "Frontend Development",
        icon: Code2,
        position: "right",
        skills: [
          "React & Next.js Development",
          "UI/UX Implementation",
          "Performance Optimization",
          "Modern Web Architecture",
          "Responsive Design Systems",
          "Component Libraries"
        ]
      },
      {
        category: "Backend Systems",
        icon: Database,
        position: "bottomLeft",
        skills: [
          "API Development",
          "Database Architecture",
          "Cloud Infrastructure",
          "System Integration",
          "Security Implementation",
          "Microservices Design"
        ]
      }
    ];
  
    return (
      <div className="absolute inset-0 pointer-events-auto">
        <div className="relative w-full h-full">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              index={index}
              category={category.category}
              skills={category.skills}
              icon={category.icon}
              position={category.position}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default SkillCards;